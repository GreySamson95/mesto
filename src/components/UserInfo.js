export class UserInfo {
    constructor(profileName, profileSelf) {
        this._profileName = document.querySelector(profileName);
        this._profileSelf = document.querySelector(profileSelf);
    }

    getUserInfo() {
        return {
            "name": this._profileName.textContent,
            "about": this._profileSelf.textContent
        }
    }

    setUserInfo({ param1, param2, ...rest }) {
        this._profileName.textContent = param1;
        this._profileSelf.textContent = param2;
    }
}