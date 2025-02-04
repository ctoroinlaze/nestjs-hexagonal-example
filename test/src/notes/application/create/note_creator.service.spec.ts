import { NoteCreator } from '@app/notes/application/create/note_create.service';
import { NoteRepositoryMock } from '../../infrastructure/notes_repository.mock';
import { Note } from '@app/notes/domain/notes.model';
import { NoteMother } from '../../domain/note.mother';
import { InvalidArgumentError } from '@app/shared/domain/value_object/invalid_argument_error';

jest.mock('@app/notes/domain/notes.repository');

describe('NoteCreator', () => {
  let service: NoteCreator;
  let repositoryMock: NoteRepositoryMock;

  beforeEach(async () => {
    jest.clearAllMocks();
    repositoryMock = new NoteRepositoryMock();
    service = new NoteCreator(repositoryMock);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('it should return a success ticket', async () => {
    const note: Note = NoteMother.random();
    expect(await service.run(note)).toEqual(note);
  });

  it('it should return a error', async () => {
    expect(() => NoteMother.randomEmpyId()).toThrow(
      '<Uuid> does not allow the value <>',
    );
  });
});
