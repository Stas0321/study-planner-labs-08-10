import { test } from 'node:test';
import assert from 'node:assert/strict';
import { taskReducer, isTasks } from '../src/reducers/taskReducer.ts';
import { initialTasks } from '../src/data/initialTasks.ts';
test('immutable toggle and update preserve previous snapshots', () => {
 const state = {tasks:structuredClone(initialTasks),pending:null};
 const before = structuredClone(state);
 const toggled = taskReducer(state,{type:'toggle',id:'react'});
 assert.equal(toggled.tasks[0].completed,true); assert.deepEqual(state,before);
 const updated = taskReducer(toggled,{type:'update',id:'react',draft:{title:'Edited',description:'Details',category:'Test',priority:'low'}});
 assert.equal(updated.tasks[0].title,'Edited');assert.equal(updated.tasks[0].completed,true);assert.equal(toggled.tasks[0].title,'React Components');
});
test('request/undo preserve task; confirmation removes only requested task',()=>{
 const state={tasks:initialTasks,pending:null};const pending=taskReducer(state,{type:'requestDelete',id:'react'});
 assert.equal(pending.tasks.length,3); assert.equal(taskReducer(pending,{type:'undoDelete'}).tasks.length,3);
 assert.equal(taskReducer(pending,{type:'requestDelete',id:'state'}).pending,'react');
 const deleted=taskReducer(pending,{type:'confirmDelete'});assert.equal(deleted.tasks.length,2);assert.equal(deleted.pending,null);
});
test('reset clears pending; stale confirmation after reset deletes nothing',()=>{
 const state=taskReducer({tasks:[],pending:'react'},{type:'reset',tasks:initialTasks});
 assert.equal(state.pending,null);assert.equal(taskReducer(state,{type:'confirmDelete'}).tasks.length,3);
});
test('storage validation rejects malformed fields and duplicate ids',()=>{
 assert.equal(isTasks(initialTasks),true);assert.equal(isTasks([]),true);assert.equal(isTasks([{}]),false);assert.equal(isTasks([{...initialTasks[0],priority:'urgent'}]),false);assert.equal(isTasks([initialTasks[0],initialTasks[0]]),false);
});
