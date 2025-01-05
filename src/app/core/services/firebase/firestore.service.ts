import { Injectable, inject } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  FieldValue,
  Firestore,
  setDoc,
  docData,
  deleteDoc,
  orderBy,
  query,
  where,
  or,
  Timestamp,
} from '@angular/fire/firestore';
import { Task } from '../../models/task.model';
import { Project } from '../../models/project.model';
import { User } from '@angular/fire/auth';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private fs: Firestore = inject(Firestore);

  //Collection and SubCollection (easy to find when writing security rules)
  projectCol = 'projects';
  todoCol = (projectId: string) => `${this.projectCol}/${projectId}/todos`;

  //Generate id for document (works even offline)
  createDocId = (colName: string) => doc(collection(this.fs, colName)).id;

  setProject(p: Project<FieldValue | null>) {
    const projectColRef = collection(this.fs, this.projectCol);
    const projectDocRef = doc(projectColRef, p.id);
    return setDoc(projectDocRef, p, { merge: true });
  }

  setTask(projectId: string, t: Task<FieldValue | null>) {
    const todoColRef = collection(this.fs, this.todoCol(projectId));
    const todoDocRef = doc(todoColRef, t.id);
    return setDoc(todoDocRef, t, { merge: true });
  }

  getProjects(user: User) {
    const projectColRef = collection(this.fs, this.projectCol);
    const queryProjects = query(
      projectColRef,
      or(
        where('uid', '==', user.uid),
        where('contributors', 'array-contains', user.email)
      ),
      orderBy('createdAt', 'desc')
    );
    return collectionData(queryProjects);
  }

  getTodos(projectId: string, todoStatus: string) {
    const todoColRef = collection(this.fs, this.todoCol(projectId));
    const queryTodos = query(
      todoColRef,
      where('status', '==', todoStatus),
      orderBy('createdAt', 'asc')
    );
    return collectionData(queryTodos) as Observable<Task<Timestamp>[]>;
  }

  getDocData(colName: string, id: string) {
    return docData(doc(this.fs, colName, id));
  }

  deleteData(colName: string, id: string) {
    return deleteDoc(doc(this.fs, colName, id));
  }

  formatedTimestamp = (t?: Timestamp) => (t?.seconds ? t.toDate() : new Date());
}
