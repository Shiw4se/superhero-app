import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
// Исправленный импорт
import HeroDetails from '../components/HeroDetails';

const mockHero = {
    _id: '1',
    nickname: 'TestMan',
    real_name: 'John Doe',
    origin_description: 'Bit by a radioactive bug',
    superpowers: 'Coding',
    catch_phrase: 'Hello World',
    images: ['test.jpg']
};

describe('HeroDetails Component', () => {

    it('should not render anything if no hero is provided', () => {
        const { container } = render(<HeroDetails hero={null} />);
        expect(container.firstChild).toBeNull();
    });

    it('should display hero data', () => {
        render(<HeroDetails hero={mockHero} onClose={() => {}} onEdit={() => {}} />);

        expect(screen.getByText('TestMan')).toBeInTheDocument();
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Bit by a radioactive bug')).toBeInTheDocument();
    });

    it('should call onEdit when the button is clicked', () => {
        const handleEdit = vi.fn();

        render(<HeroDetails hero={mockHero} onClose={() => {}} onEdit={handleEdit} />);

        const editBtn = screen.getByText(/Edit Hero/i);
        fireEvent.click(editBtn);

        expect(handleEdit).toHaveBeenCalledTimes(1);
    });
});