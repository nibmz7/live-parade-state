export default class LoginController {
    
    constructor(auth, loginView) {
        this.auth = auth;
        this.loginView = loginView;

        this.auth.on('signed-in', this.signedIn.bind(this));
        this.auth.on('signed-out', this.signedOut.bind(this));
        this.auth.on('error', this.error.bind(this));

        this.loginView.bindSignIn((email, password) => {
            this.auth.login(email, password);
        });

        this.appRouter = document.querySelector('app-router');
        this.auth.init();
    }

    signedIn(user) {

    }

    signedOut() {
        this.appRouter.showView('home', this.loginView);
    }

    error(e) {
        this.loginView.showError(e.message);
    }
}