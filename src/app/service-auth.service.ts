import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

// Avoid name not cound warnings
declare var Auth0Lock: any;

@Injectable()
export class ServiceAuth {
    //Configure Auth0
    lock = new Auth0Lock( 'gpoaLFY92U66mGgAllObNrU2TBye19Dw', 'fdagher1.auth0.com', {
        theme: { 
            primaryColor: "#31324F",
            logo: "favicon.png"
        },
        languageDictionary: {
            title: "Event Recorder"
        }
    });

    //Profile object for auth class
    userProfile: Object;

    constructor() {
        //Set userProfile attribute of already saved Profile
        this.userProfile = JSON.parse(localStorage.getItem('profile'));
        
        // Add callback for the Lock `authenticated` event
        this.lock.on('authenticated', (authResult) => { 
            localStorage.setItem('id_token', authResult.idToken);

            //Fetch profile information
            this.lock.getProfile(authResult.idToken, (error, profile) => {
                if (error) {
                    alert(error);
                    return;
                }

                localStorage.setItem('profile', JSON.stringify(profile));
                this.userProfile = profile;
            });
        });
    }
    
    public login() {
        this.lock.show();
    }

    public logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        this.userProfile = undefined;
    }

    public authenticated(){
        return tokenNotExpired();
    }
}