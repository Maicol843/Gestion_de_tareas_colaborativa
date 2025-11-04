import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useBoardStore } from '../boardStore' // Ajusta la ruta si es necesario

// Mock de nanoid para tener IDs predecibles en el test
import { nanoid } from 'nanoid'
vi.mock('nanoid', () => ({
  nanoid: vi.fn(() => 'test-id-123') 
}))


describe('Board Store Actions', () => {
  let store;

  beforeEach(() => {
    // 1. Crea y activa una instancia limpia de Pinia antes de cada test
    setActivePinia(createPinia());
    store = useBoardStore();

    // 2. Mock de datos iniciales más simples para el test
    store.lists = [
        { id: 'l1', title: 'To Do', cards: [{ id: 'c1', title: 'Tarea A' }] },
        { id: 'l2', title: 'Done', cards: [{ id: 'c2', title: 'Tarea B' }, { id: 'c3', title: 'Tarea C' }] }
    ];
  });

  // ==========================================================
  // Test para la Acción: addCard
  // ==========================================================
  it('should add a new card to the specified list', () => {
    // Ejecutar la acción
    store.addCard('l1', 'Nueva Tarea');
    
    // 1. Verificar el número total de tarjetas en la lista de destino
    expect(store.lists[0].cards.length).toBe(2);

    // 2. Verificar que la tarjeta se haya añadido correctamente con el ID mockeado
    expect(store.lists[0].cards[1].title).toBe('Nueva Tarea');
    expect(store.lists[0].cards[1].id).toBe('test-id-123'); 
  });

  // ==========================================================
  // Test para la Acción: moveCard
  // ==========================================================
  it('should move a card from source list to destination list', () => {
    const cardId = 'c1';
    const sourceListId = 'l1';
    const destinationListId = 'l2';
    const newIndex = 1; // Mover a la segunda posición de 'Done'

    // Ejecutar la acción
    store.moveCard(cardId, sourceListId, destinationListId, newIndex);

    // 1. Verificar que la tarjeta se eliminó de la lista de origen (To Do)
    expect(store.lists.find(l => l.id === 'l1').cards.length).toBe(0);

    // 2. Verificar que la tarjeta se añadió a la lista de destino (Done)
    const doneList = store.lists.find(l => l.id === 'l2');
    expect(doneList.cards.length).toBe(3);

    // 3. Verificar la posición y el contenido de la tarjeta movida
    expect(doneList.cards[1].id).toBe('c1'); // Debe estar en la posición 1
    expect(doneList.cards[0].id).toBe('c2'); // Las otras tarjetas se mantienen
  });
});