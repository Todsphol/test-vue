<template>
    <div id="Edit">
       <h1>Note</h1>
        <div class="container">
            <p>Title</p>
            <input class="input-control" v-model="title" />
            <!-- <p class="is-danger" v-if="isTitleRequired">requied</p> -->
            <div class="type-wrapper">
            <p>Type</p>
            <label class="radio-wrapper">Important
                <input type="radio" v-bind:value="true" v-model="isImportant" />
                <span class="check"></span>
            </label>
            <label class="radio-wrapper">None
                <input type="radio" v-bind:value="false" v-model="isImportant" />
                <span class="check"></span>
            </label>
            </div>
            <p>Description</p>
            <textarea class="textarea-control" v-model="description"></textarea>
            <div class="action">
            <button type="button" class="btn" @click="goBack">Cancel</button>
            <button type="button" class="btn btn-save" @click="onSubmit">Save</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Edit',
      data: function() {
    return {
    //   note: null,
      id: null,
      title: "",
      description: "",
      isImportant: false,
    //   isTitleRequired: false,
    };
  },
  created() {
    this.id = this.$route.params.id;
    const list  = JSON.parse(sessionStorage.getItem('listNotes')) || [];
    const data = list.find(r => r.id == this.id);
    if (data) {
      this.initData(data);
    }
  },
   methods: {
    initData: function(data) {
      this.title = data.title;
      this.description = data.description;
      this.isImportant = data.isImportant;
    },
    goBack: function() {
      this.$router.push({path: `/`});
    },
    onSubmit: function(e) {
        console.log(e)
    //   if (this.isTitleRequired) {
    //     return;
    //   }
    const list  = JSON.parse(sessionStorage.getItem('listNotes')) || [];
    
    const data = {
    id: list.length,
    title: this.title,
    description: this.description,
    isImportant: this.isImportant,
    };
    list.push(data);
    console.log(list, 'listlistlistlistlist');
    
    sessionStorage.setItem('listNotes', JSON.stringify(list))
    this.$router.push({path: `/`});
    //   NoteService.updateNote(this.id, data).then((response) => {
    //     this.initData(response);
    //   })
    //   e.preventDefault();
    }
  },
}
</script>
