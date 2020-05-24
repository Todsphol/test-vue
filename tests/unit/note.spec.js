import { shallowMount } from '@vue/test-utils'
import Note from '@/components/Note.vue'

import Vue from 'vue'
Vue.config.ignoredElements = ['font-awesome-icon']

describe('Note.vue', () => {
  it('ถ้าเรียกใช้ฟังก์ชัน onAdd ต้อง redirect ไปที่ path /add', () => {
    const $router = {
      push: jest.fn()
    }

    const component = shallowMount(Note, {
      mocks: {
        $router
      }
    })

    component.vm.onAdd();
    expect($router.push).toHaveBeenCalledWith({ 'path': '/add' });
  });
  
  it('ถ้าเรียกใช้ฟังก์ชัน onEdit แล้วส่ง id = 1 ต้อง redirect ไปที่ path edit/1', () => {
    const $router = {
      push: jest.fn(),
    }

    const component = shallowMount(Note, {
      mocks: {
        $router
      }
    });

    const item = {id: 1};
    component.vm.onEdit(item);
    expect($router.push).toHaveBeenCalledWith({ 'path': '/edit/1'});
  });

  it('ถ้าเรียกใช้ฟังก์ชัน onEdit แล้วต้องเปลี่ยนค่าของตัวแปร isEdit ใน component จาก false เป็น true', () => {
    const component = shallowMount(Note);
    
    component.vm.toggleClick();

    expect(component.vm.isEdit).toBeTruthy();

  });

  it('ถ้าเรียกใช้ฟังก์ชัน onEdit แล้วต้องเปลี่ยนค่าของตัวแปร isEdit ใน component จาก true เป็น false', () => {
    const component = shallowMount(Note);
    component.setData({ isEdit: true });
    
    component.vm.toggleClick();

    expect(component.vm.isEdit).toBeFalsy();

  });

  it('ถ้าเรียกฟังก์ชัน iconDelete แล้ว เข้าเงื่อนไข length = 0  มันควรจะเรียกใช้ removeItem ', () => {
    Object.defineProperty(window, "sessionStorage", {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
        removeItem: jest.fn(() => null)
      },
      writable: true
    });
    const component = shallowMount(Note);
    component.setData({lists : [{id: 1}]});

    component.vm.iconDelete(1);
    expect(window.sessionStorage.removeItem).toHaveBeenCalled();
    expect(window.sessionStorage.setItem).not.toHaveBeenCalled();
  });

  it('ถ้าเรียกใช้ฟังก์ชัน iconDelete แล้ว ไม่เข้าเงื่อนไข length != 0 มันควรเรียก setItem ', () => {
    Object.defineProperty(window, "sessionStorage", {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
        removeItem: jest.fn(() => null)
      },
      writable: true
    });
    const component = shallowMount(Note);
    component.setData({lists: [{id:1}, {id:2}]})

    component.vm.iconDelete(1);
    expect(window.sessionStorage.setItem).toHaveBeenCalled();
    expect(window.sessionStorage.removeItem).not.toHaveBeenCalled();
  });
  
  it('ถ้าเรียกใช้ฟังก์ชัน day จะได้ค่าวันที่กลับมา', () => {
    const currentDate = new Date();
    const component = shallowMount(Note);
    const result = component.vm.day(currentDate);
    expect(result).toEqual(24);
  });

  it('ถ้าเรียกใช้ฟังก์ชัน month จะได้เดือนภาษาอังกฤษกลับมา', () => {
    const currentDate = new Date();
    const component = shallowMount(Note);
    const result = component.vm.month(currentDate);
    expect(result).toEqual('May');
  });

  it('ถ้าเรียกใช้ฟังก์ชัน year จะได้ค่าของปีกลับมา', () => {
    const currentDate = new Date();
    const component = shallowMount(Note);
    const result = component.vm.year(currentDate);
    expect(result).toEqual(2020);
  });


  it('ถ้าเรียกฟังก์ชัน isChecked แล้ว setItem ต้องโดนเรียกใช้ด้วย ', () => {
    Object.defineProperty(window, "sessionStorage", {
      value: {
        setItem: jest.fn(() => null),
        getItem: jest.fn(() => null)
      },
      writable: true
    });

    const component = shallowMount(Note);
    const item = {id: 1, isDone: false};
    const isDone = true;
    component.setData({ lists: [{id: 1, isDone: false}] })
    
    component.vm.isChecked(item, isDone);
    expect(window.sessionStorage.setItem).toHaveBeenCalled();
  });

})
