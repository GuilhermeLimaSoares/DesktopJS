const app = new Vue({
  el: "#app",
  data: function () {
    return {
      //   notes: [
      //     { content: "Nota 1" },
      //     { content: "Nota 2" },
      //     { content: "Nota 3" },
      //     { content: "Nota 4" },
      //   ],

      notes: [],
      active: null,
    };
  },
  methods: {
    remove: function () {
      for (let i = 0; i < this.notes.length; i++) {
        if (this.notes[i].content == "") {
          this.notes.splice(i, 1);
        }
        window.localStorage.setItem("notes", JSON.stringify(this.notes));
      }
    },
    create: function () {
      this.active = null;
      this.$refs.textarea.value = "";
      this.remove();
    },
    select(key) {
      this.active = key;
      this.$refs.textarea.value = this.notes[key].content;
      this.remove();
    },
    save: _.debounce(function () {
      let data = this.$refs.textarea.value;
      let notes = window.localStorage.getItem("notes") || "[]";
      notes = JSON.parse(notes);

      if (this.active == null) {
        //criado
        notes.splice(0, 0, {
          content: data,
        });
      } else {
        //atualizado
        notes[this.active].content = data;
      }

      this.notes = notes;

      if (this.active === null) {
        this.select(0);
      }

      window.localStorage.setItem("notes", JSON.stringify(this.notes));
    }, 300),
  },
  mounted: function () {
    /* localStorage.setItem(
      `notes`,
      `[{ "content":"Primeira Anotacao" },{ "content" : "Segunda anotacao" }]`
    ); */
    let notes = window.localStorage.getItem("notes") || "[]";
    // this.notes = JSON.parse(notes);
    if (typeof notes !== "undefined") {
      this.notes = JSON.parse(notes);
    }
    console.log(this.notes);
  },
});
