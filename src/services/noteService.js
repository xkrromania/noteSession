/**
 * Service for notes
 */
let noteService = {
  /**
   * @function save - Save the note in localStorage
   * @param {object} note - The note to be saved
   */
  save: function(note) {
    localStorage.setItem("note", note);
  },
  get: function() {
    return JSON.parse(localStorage.getItem("note"));
  }
};

export default noteService;
