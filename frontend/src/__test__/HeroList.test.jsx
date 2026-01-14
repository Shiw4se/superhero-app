import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
// Исправленный импорт
import HeroList from '../components/HeroList';

// Mock axios
vi.mock('axios');

const mockHeroes = [
    { _id: '1', nickname: 'Batman', images: [] },
    { _id: '2', nickname: 'Robin', images: [] }
];

describe('HeroList Component', () => {

    it('should load and display a list of heroes', async () => {
        axios.get.mockResolvedValue({
            data: {
                data: mockHeroes,
                meta: { total: 2, page: 1, limit: 5 }
            }
        });

        render(<HeroList onHeroClick={() => {}} />);

        await waitFor(() => {
            expect(screen.getByText('Batman')).toBeInTheDocument();
            expect(screen.getByText('Robin')).toBeInTheDocument();
        });
    });

    it('should display a message if the list is empty', async () => {
        axios.get.mockResolvedValue({
            data: { data: [], meta: { total: 0 } }
        });

        render(<HeroList onHeroClick={() => {}} />);

        await waitFor(() => {
            expect(screen.getByText(/No heroes yet/i)).toBeInTheDocument();
        });
    });

    it('should call onHeroClick when a card is clicked', async () => {
        axios.get.mockResolvedValue({
            data: { data: mockHeroes, meta: { total: 2 } }
        });

        const handleClick = vi.fn();
        render(<HeroList onHeroClick={handleClick} />);

        await waitFor(() => screen.getByText('Batman'));

        fireEvent.click(screen.getByText('Batman'));

        expect(handleClick).toHaveBeenCalledWith(mockHeroes[0]);
    });
});