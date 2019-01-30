import noteService from "./noteService.js";

beforeEach(function() {
  // browser mocks
  const localStorageMock = (function() {
    let store = {};
    return {
      getItem: function(key) {
        return store[key] || null;
      },
      setItem: function(key, value) {
        store[key] = value.toString();
      },
      removeItem: function(key) {
        delete store[key];
      },
      clear: function() {
        store = {};
      }
    };
  })();

  Object.defineProperty(window, "localStorage", {
    value: localStorageMock
  });
});

describe("Service: noteService", () => {
  test("It can save a note", () => {
    const note = {
      content: "test"
    };
    jest.spyOn(window.localStorage, "setItem");
    noteService.save(note);
    const parsedNote = JSON.stringify(note);
    expect(localStorage.setItem).toHaveBeenCalledWith("note", parsedNote);
  });
  test("It can get a note using a key", () => {
    jest.spyOn(window.localStorage, "getItem");
    noteService.get();
    expect(localStorage.getItem).toHaveBeenCalledWith("note");
  });
});
