export class UserInfo {
    constructor(profileNameSelector, profileAboutSelector, profileAvatarSelector) {
        this._profileNameSelector = document.querySelector(profileNameSelector)
        this._profileAboutSelector = document.querySelector(profileAboutSelector)
        this._profileAvatarSelector = document.querySelector(profileAvatarSelector)
    }

    getUserInfo() {
        return {
            "name": this._profileNameSelector.textContent,
            "about": this._profileAboutSelector.textContent,
            "avatar": this._profileAvatarSelector.src
        }
    }

    setUserInfo({ name, about, avatar }) {
        this._profileNameSelector.textContent = name
        this._profileAboutSelector.textContent = about
        this._profileAvatarSelector.src = avatar
    }
}