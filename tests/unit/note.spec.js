import { shallowMount } from '@vue/test-utils'
import Note from '@/components/Note.vue'
import sinon from 'sinon'
import Vue from 'vue'
Vue.config.ignoredElements = ['font-awesome-icon']

describe('Note.vue', () => {
  it('renders props.title when passed', () => {
    const title = ''
    const wrapper = shallowMount(Note, {
      propsData: { title }
    })
    expect(wrapper.text()).toMatch(title)
  });

  it('ถ้าเรียกใช้ฟังก์ชัน toggleClick ต้องเปลี่ยนค่า isEdit', () => {
    const component = shallowMount(Note);
    component.setData({ isEdit: false });

    component.vm.toggleClick();
    expect(component.vm.isEdit).toBeTruthy();
  });


  it('ถ้าเรียกใช้ฟังก์ชัน day จะได้ค่าวันปัจจุบันออกมา', () => {
    const date = new Date();
    const component = shallowMount(Note);
    const result = component.vm.day(date);
    expect(result).toBe(new Date().getDay());
  });

  it('ถ้าเรียกใช้ฟังก์ชัน month จะได้ค่าเดือนภาษาอังกฤษออกมา', () => {
    const date = new Date();
    const component = shallowMount(Note);
    const result = component.vm.month(date);
    expect(result).toEqual('May');
  });

  it('ถ้าเรียกใช้ฟังก์ชัน year จะได้ค่าของปีปัจจุบันออกมา', () => {
    const date = new Date();
    const component = shallowMount(Note);
    const result = component.vm.year(date);
    expect(result).toEqual(2020);
  });

  it('ถ้าเรียกใช้ฟังก์ชัน isChecked จะต้องมีข้อมูลลอง sessionStorage', () => {
    Object.defineProperty(window, "sessionStorage", {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null)
      },
      writable: true
    });
    const item = {
      id: 1, isDone: false
    }
    const component = shallowMount(Note)
    component.setData({ lists: [{id: 1, isDone: false}]})

    component.vm.isChecked(item, true);
    expect(window.sessionStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('ถ้าเรียกฟังก์ชัน iconDelete จะต้องเรียก removeItem ใน session storage อย่างน้อง 1 ครั้ง', () => {
    Object.defineProperty(window, "sessionStorage", {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
        removeItem: jest.fn(() => null)
      },
      writable: true
    });
    const component = shallowMount(Note);
    component.setData({ lists: [{id: 1}]});

    component.vm.iconDelete(1);
    expect(window.sessionStorage.removeItem).toHaveBeenCalledTimes(1);
  });


})
