<template>
  <!-- <div id="Note">
    <div class="a" @click="onAdd"> Add note: </div>
    <div v-for="item in lists" :key="item.id" @click="onEdit(item)">{{item.title}}</div>
  </div> -->
  <div id="note">
    <div class="note-box" @click="onAdd">
      <div class="container">
          <div class="icon">
            <font-awesome-icon icon="plus"/>  <span class="add-note">  Add Note </span>
          </div>
      </div>
    </div>
    <div class="status">
      <div>
        <span>{{noteLeft}} notes left</span>
      </div>
      <div>
        <span class="btn-edit" :class="{'is-edit': isEdit}" @click="toggleClick">Edit</span>
      </div>
    </div>
    <div class="note-box" v-for="item in lists" :key="item.id">
      <div class="container">
          <div id="note-item">
            <div class="checkbox-wrapper">
              <label class="checkbox-label">
                <input type="checkbox"/>
                <span class="checkbox"></span>
              </label>
            </div>
            <div class="date-wrapper">
              <p> day </p>
              <span>month year</span>
            </div>
            <div class="detail-wrapper">
              <p> title </p>
              <span class="description"> description </span>
            </div>
            <div class="action-wrapper">
              <font-awesome-icon icon="trash-alt"  @click="iconDelete(item.id)" v-if="!isEdit" />
              <font-awesome-icon icon="pencil-alt"  @click="iconEdit" v-else />
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router';
export default {
  name: 'Note',
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      lists: [],
      title: "",
      isEdit: false,
    };
  },
  created() {
      this.lists = JSON.parse(sessionStorage.getItem('listNotes')) || [];
  },
  methods: {
      onAdd: function() {
          this.$router.push({ path: `/add`});
      },
    onEdit: function (item) {
        this.$router.push({ path: `/edit/${item.id}`});
      // router.push({ path: `/edit/${this.id}`});
    },
    toggleClick: function() {
      this.isEdit = !this.isEdit;
    },
    iconDelete: function(id) {
      this.lists = this.lists.filter(r => r.id != id);
      if(this.lists.length == 0) {
        sessionStorage.removeItem('listNotes');
      } else {
        sessionStorage.setItem('listNotes', JSON.stringify(this.lists));
      }
    },
    iconEdit: function () {
      router.push({ path: `/edit/${this.id}`});
    }
  },
  computed: {
    noteLeft: function() {
      return this.lists.filter((note) => note.isDone).length;
    }
  }
}
</script>


<style>
#note {
  width: 80%;
  min-width: 769px;
  margin: auto;
}
#note h1 {
  font-size: 36px;
  color: #424141;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
}
.note-box {
  margin: auto;
  margin-bottom: 10px;
}
.status {
  display: flex;
  width: 520px;
  margin: auto;
  justify-content: space-between;
  padding: 0 10px;
  color: #bababa;
  font-size: 18px;
}
.btn-edit {
  cursor: pointer;
}
.btn-edit.is-edit {
  color: #424141;
}



#add-note {
  display: flex;
}
.icon {
  line-height: 62px;
  margin-right: 12px;
  color: #808080;
  text-align: left;
  cursor: pointer;
}
.add-note {
  border: none;
  width: 100%;
  height: 62px;
  font-size: 1.5rem;
  color: #808080;
}

.note-box {
  width: 520px;
  /* padding: 24px 40px; */
  background: #ffffff;
  box-shadow: 0 2px 7px 0 #e8e8e8;
  min-height: 80px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
}

.highlight {
  background-color: #ffffff;
  width: 10px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
.container {
  padding: 9px 24px 9px 30px;
  width: 100%;
}
.highlight.isDanger {
  background-color: #ffb0b3;
}
#note-item {
  display: flex;
  flex-direction: row;
}
#note-item > * {
  min-height: 60px;
}
.checkbox-wrapper {
  position: relative;
  flex-basis: 40px;
}
.date-wrapper {
  padding-top: 10px;
  flex-basis: 35%;
}
.detail-wrapper {
  flex-basis: 100%;
}
.action-wrapper {
  flex-basis: 15%;
  line-height: 60px;
  text-align: right;
}
.action-wrapper > svg {
  color: #bababa;
}

input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.checkbox {
  position: absolute;
  top: 15px;
  left: 0;
  height: 32px;
  width: 32px;
  border-radius: 16px;
  border: solid 2px #979797;
}
.checkbox-label:hover input ~ .checkbox {
  background-color: #979797;
}
.checkbox-label input:checked ~ .checkbox {
  background-color: #92dc5a;
  border-color: #92dc5a;
}
.checkbox:after {
  content: "";
  position: absolute;
  display: none;
}
.checkbox-label input:checked ~ .checkbox:after {
  display: block;
}
.checkbox-label .checkbox:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.date-wrapper p {
  font-size: 24px;
  color: #424141;
}
.date-wrapper span {
  font-size: 18px;
  color: #424141;
}
.detail-wrapper p {
  font-size: 24px;
  color: #424141;
  line-height: 60px;
  text-align: left;
}
.detail-wrapper p.is-done {
  text-decoration: line-through;
}
.detail-wrapper .description {
  float: left;
  text-align: left;
  font-size: 18px;
  color: #808080;
}
</style>
