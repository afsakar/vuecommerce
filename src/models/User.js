import { Model } from 'pinia-orm';

export default class User extends Model {
    static entity = 'users';
    static fields() {
        return {
            uid: this.string(),
            displayName: this.string(),
            email: this.string(),
            phone: this.string(),
        };
    }
}
