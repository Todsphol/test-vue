<template>
    <div id="Edit">
       <h1>Note</h1>
        <div class="container">
            <p>Title</p>
            <input class="input-control" id="title" v-model="title" />
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
            <textarea class="textarea-control" id="description" v-model="description"></textarea>
            <div class="action">
            <button type="button" id="btn-back" class="btn" @click="goBack">Cancel</button>
            <button type="button" id="btn-save" class="btn btn-save" @click="onSubmit">Save</button>
            </div>
        </div>
    </div>
</template>

<script>
import NoteService  from '@/services/note.service';
export default {
    name: 'Edit',
      data: function() {
    return {
    //   note: null,
      id: null,
      title: "",
      description: "",
      isImportant: false,
      date: String,
      isDone: Boolean
    //   isTitleRequired: false,
    };
  },
  created() {
    this.id = this.$route.params.id;
    if (this.id) {
      NoteService.getNote(this.id).then(r => {
      if (r) this.initData(r);
    });
    }
    
  },
   methods: {
    initData: function(data) {
      this.title = data.title;
      this.description = data.description;
      this.isImportant = data.isImportant;
      this.isDone = data.isDone;
    },
    goBack: function() {
      this.$router.push({path: `/`});
    },
    onSubmit: function() {
      const data = {
            title: this.title,
            description: this.description,
            isImportant: this.isImportant,
            isDone: this.isDone
          };

      if(this.id){
          NoteService.updateNote(this.id, data).then(() => {
            this.$router.push({path: `/`});
        })
      } else {
        NoteService.addNote(data).then(() => {
          this.$router.push({path: `/`});
        });
      }

    }
  },
}
</script>

<style scoped>
.container {
  margin: auto;
  margin-top: 30px;
  width: 600px;
  border-radius: 32px;
  box-shadow: 0 2px 7px 0 #e8e8e8;
  background-color: #ffffff;
  padding: 20px 60px;
}
.container > p, .type-wrapper > p {
  text-align: left;
  font-size: 24px;
  color: #424141;
}
.type-wrapper {
  display: flex;
  margin: 15px 0;
}
.action {
  text-align: right;
}
.action .btn:first-child {
  margin-right: 16px;
}
.input-control {
  width: 100%;
  height: 40px;
  border-radius: 4px;
  background-color: #ffffff;
  border: solid 1px #bababa;
  padding: 0 10px;
  font-size: 24px;
  color: #424141;
}
.input-control:focus,
.textarea-control:focus {
  border: solid 1px #1782ff;
}
.textarea-control {
  width: 100%;
  height: 160px;
  border-radius: 4px;
  border: solid 1px #bababa;
  background-color: #ffffff;
  padding: 10px;
  font-size: 20px;
  color: #424141;
}
.btn {
  width: 94px;
  height: 32px;
  border-radius: 4px;
  border: solid 1px #1782ff;
  background-color: #ffffff;
  color: #1782ff;
  font-size: 15px;
  font-weight: bold;
}
.btn.btn-save {
  background-color: #1782ff;
  color: #ffffff;
}
.is-danger {
  color: red;
  text-align: left;
}

.radio-wrapper {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin-left: 10px;
}
.radio-wrapper input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}
.radio-wrapper .check {
  position: absolute;
  top: 5px;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #ffffff;
  border: 1px solid #bababa;
  border-radius: 50%;
}
.radio-wrapper:hover input ~ .check {
  background-color: #ccc;
}
.radio-wrapper input:checked ~ .check {
  background-color: #ffffff;
  border-color: #2196F3;
}
.check:after {
  content: "";
  position: absolute;
  display: none;
}
.radio-wrapper input:checked ~ .check:after {
  display: block;
}
.radio-wrapper .check:after {
  top: 4px;
	left: 4px;
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background: #2196F3;
}
</style>
