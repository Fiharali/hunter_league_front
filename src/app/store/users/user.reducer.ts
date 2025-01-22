import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.module';
import * as UserActions from './user.actions';


export interface UserState {
  user: User[];
  loading: boolean;
  error: any;
}


export const initialState: UserState = {
  user: [],
  loading: false,
  error: null
};


export const userReducer = createReducer(
  initialState,

  on(UserActions.loadUser, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(UserActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false
  })),

  on(UserActions.loadUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),


  on(UserActions.createUser, state => ({
    ...state,
    loading: true
  })),

  on(UserActions.createUserSuccess, (state, { user }) => ({
    ...state,
    user: [...state.user, user],
    loading: false
  })),

  on(UserActions.createUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  on(UserActions.deleteUser, state => ({
    ...state,
    loading: true
  })),

  on(UserActions.deleteUserSuccess, (state, { id }) => ({
    ...state,
    user: state.user.filter(user => user.id !== id),
    loading: false
  })),

  on(UserActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))

);
