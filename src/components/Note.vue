<template>
  <div id="note">
    <h1>Note</h1>
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

    <div class="note-box" v-for="(item, index) in lists" :key="item.id">
      <div class="highlight" :class="{'isDanger': item.isImportant}"></div>
      <div class="container">
          <div id="note-item">

            <div class="checkbox-wrapper">
              <label class="checkbox-label">
                <input type="checkbox" :checked="item.isDone" @click="isChecked(item, $event.target.checked)"/>
                <span class="checkbox"></span>
              </label>
            </div>

            <div class="date-wrapper">
              <p> {{ day(item.date)}} </p>
              <span>{{month(item.date)}} {{year(item.date)}}</span>
            </div>

            <div class="detail-wrapper">
              <p :class="{ 'is-done': item.isDone }"> {{item.title}} </p>
              <span class="description"> {{item.description}} </span>
            </div>

            <div class="action-wrapper">
              <font-awesome-icon :id="'trash-'  + index" icon="trash-alt"  @click="iconDelete(item.id)" v-if="!isEdit" />
              <font-awesome-icon :id="'pancil-' + index" icon="pencil-alt"  @click="onEdit(item)" v-else />
            </div>

          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Note',
  data() {
    return {
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
     day: function(e) {
      return new Date(e).getDay()
    },
    month: function(e) {
      return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][new Date(e).getMonth()]
    },
    year: function(e) {
      return new Date(e).getFullYear();
    },
    isChecked: function(item, isDone) {
      item.isDone = isDone;
      const list = this.lists.map(r => {
        if(r.id == item.id) {
          r = item;
        }
        return r;
      });
      sessionStorage.setItem('listNotes', JSON.stringify(list))
    }
  },
  computed: {
    noteLeft: function() {
      return this.lists.filter((note) => note.isDone).length;
    },
   
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
  font-size: 32pt;
  color: #424141;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
}

.note-box {
  width: 520px;
  background: #ffffff;
  box-shadow: 0 2px 7px 0 #e8e8e8;
  min-height: 80px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  margin: auto;
  margin-bottom: 10px;
}

.container {
  padding: 9px 24px 9px 30px;
  width: 100%;
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

/*
▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△
|style ของขั้นตอนการสร้างหน้าขึ้นมาใหม่และ style ของปุ่มเพิ่ม Add Note
|copy ตั้งแต่ 150 ขึ้นไป จนถึง 103

*/


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

/*
▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△
|style ของขั้นตอนการสร้าง แถบบอกว่า done ไปกี่ list และ ปุ่มเปลี่ยน status edit เป็น delete
|copy ตั้งแต่ 174 ขึ้นไป จนถึง 160

*/

.highlight {
  background-color: #ffffff;
  width: 10px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
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

/*
▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△
|style ของขั้นตอนการสร้าง แถบสีแดงของ note-item ว่า type ของ note-item เป็น important ไหม
|copy ตั้งแต่ 199 ขึ้นไป จนถึง 183

*/


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

/*
▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△▲△
|style ของขั้นตอนการสร้าง checkbox และจัดระเบียบของ note-item พร้อมกับ style ของการขีดฆ่า font
|copy ตั้งแต่ บรรทัด 293 ขึ้นไป จนถึง 209

*/
</style>
