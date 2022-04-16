import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {ResponseEvent, SignInDto, SignUpDto} from "../_models/core.model";
import {User} from "../_models/user.model";

export enum SessionEvents {
  TOKEN_EXPIRED,
  SIGNED_IN,
  SIGNED_OUT,
  LOADING_PROFILE_SUCCESS,
  LOADING_PROFILE_FAILED,
  LOADING_AVATAR_SUCCESS,
  LOADING_AVATAR_FAILED,
}

@Injectable({
  providedIn: 'root',
})
export class WydApiService {

  private readonly events: EventEmitter<ResponseEvent> = new EventEmitter<ResponseEvent>();

  private apiPrefix = environment.baseApiPrefix;

  private httpHeaderJson = new HttpHeaders({'Content-Type': 'application/json'});

  sessionUser: User;

  constructor(private httpClient: HttpClient) {
    this.sessionUser = new User();
    this.sessionUser.name = 'No Name';
    this.sessionUser.avatarUrl = 'assets/images/avatar_2x.png';
    this.sessionUser.roleId = 'user';
  }

}
