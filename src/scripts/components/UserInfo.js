export class UserInfo {
    constructor({ userNameSelector, userAboutSelector }) {
        this._userName = document.querySelector(userNameSelector);
        this._userAbout = document.querySelector(userAboutSelector);
    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            about: this._userAbout.textContent
        };
    }

    setUserInfo(profileInfo) {
        this._userName.textContent = profileInfo.profilename;
        this._userAbout.textContent = profileInfo.profileabout;
    }
}