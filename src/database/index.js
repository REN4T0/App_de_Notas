import * as SQLite from 'expo-sqlite';

const tarefas = SQLite.openDatabase('tarefas.db');

export default tarefas;