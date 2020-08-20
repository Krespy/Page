
import { Injectable } from '@angular/core';

@Injectable()
export class AuthUser {
    constructor(){}
    private _dateLogin: Date; 
    private _id: number = 0;
    private _userName: String = "";
    private _principal: any = undefined;



    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    public get userName(): String {
        return this._userName;
    }
    public set userName(value: String) {
        this._userName = value;
    }

    public get dateLogin(): Date {
        return this._dateLogin;
    }
    public set dateLogin(value: Date) {
        this._dateLogin = value;
    }

    public get principal(): any {
        return this._principal;
    }
    public set principal(value: any) {
        this._principal = value;
    }


}