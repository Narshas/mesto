export class UserInfo {
    constructor({ userName, userAbout }) {
        this._userName = document.querySelector(userName);
        this._userAbout = document.querySelector(userAbout);
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