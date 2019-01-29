/**
 * Service for notes
 */
let noteService = {
  /**
   * @function save - Save the note in localStorage
   * @param {object} note - The note to be saved
   */
  save: function(note) {
    const parsedNote = JSON.stringify(note);
    localStorage.setItem("note", parsedNote);
  },
  get: function(key) {
    localStorage.getItem(key);
  }
};

export default noteService;
