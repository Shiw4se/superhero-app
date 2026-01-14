import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
// Исправленный импорт
import HeroForm from '../components/HeroForm';

// Mock dependencies
vi.mock('axios');
vi.mock('react-toastify', () => ({
    toast: { success: vi.fn(), error: vi.fn() }
}));

vi.mock('sweetalert2', () => ({
    default: {
        fire: vi.fn().mockResolvedValue({ isConfirmed: true })
    }
}));

describe('HeroForm Component', () => {
    const originalLocation = window.location;

    beforeEach(() => {
        Object.defineProperty(window, 'location', {
            configurable: true,
            value: { reload: vi.fn() },
        });
    });

    afterEach(() => {
        Object.defineProperty(window, 'location', {
            configurable: true,
            value: originalLocation,
        });
        vi.clearAllMocks();
    });

    it('should render an empty form for creating a new hero', () => {
        render(<HeroForm onClose={() => {}} />);

        expect(screen.getByText('New Hero')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('e.g. Superman').value).toBe('');
    });

    it('should populate fields when editing', () => {
        const existingHero = {
            _id: '123',
            nickname: 'Old Man',
            real_name: 'Logan',
            origin_description: 'X-Men',
            superpowers: 'Claws',
            catch_phrase: '...'
        };

        render(<HeroForm onClose={() => {}} initialData={existingHero} />);

        expect(screen.getByDisplayValue('Old Man')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Logan')).toBeInTheDocument();
    });

    it('should send a POST request when creating', async () => {
        axios.post.mockResolvedValue({ data: {} });

        render(<HeroForm onClose={() => {}} />);

        fireEvent.change(screen.getByPlaceholderText('e.g. Superman'), { target: { value: 'NewHero' } });
        fireEvent.change(screen.getByPlaceholderText('e.g. Clark Kent'), { target: { value: 'NewName' } });
        fireEvent.change(screen.getByPlaceholderText('How did they get their powers?'), { target: { value: 'Magic' } });

        fireEvent.click(screen.getByText('Save'));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(axios.post).toHaveBeenCalledWith(
                'http://localhost:5000/api/heroes',
                expect.any(FormData),
                expect.any(Object)
            );
        });
    });

    it('should send a PUT request when editing', async () => {
        axios.put.mockResolvedValue({ data: {} });

        const hero = { _id: '999', nickname: 'EditMe', real_name: 'Name', origin_description: 'Desc' };

        render(<HeroForm onClose={() => {}} initialData={hero} />);

        fireEvent.change(screen.getByDisplayValue('EditMe'), { target: { value: 'EditedHero' } });

        fireEvent.click(screen.getByText('Save'));

        await waitFor(() => {
            expect(axios.put).toHaveBeenCalledWith(
                'http://localhost:5000/api/heroes/999',
                expect.any(FormData),
                expect.any(Object)
            );
        });
    });
});