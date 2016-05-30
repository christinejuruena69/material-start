import {IUser} from "../../lib/users/Users";
import {UsersDataService} from "../../lib/users/services/UsersDataService";
import {UsersContactService} from "../../lib/users/services/UsersContactService";

/**
 * @ngInject
 */
export class App {
  // Define our App component's name
  static componentName:string = "msApp";

  // Define our App component's component config
  static componentConfig:ng.IComponentOptions = {
    bindings: {},
    controller: App,
    templateUrl: 'components/app/App.html'
  };
  
  // Define our injectables
  private $mdSidenav:angular.material.ISidenavService;
  private UsersDataService:UsersDataService;
  private UsersContactService:UsersContactService;

  // Define our own variables
  private users:IUser[];
  private selected:IUser;

  // Define our constructor and inject the necessary services
  constructor($mdSidenav:angular.material.ISidenavService, UsersDataService:UsersDataService,
              UsersContactService:UsersContactService) {
    // Store all of our injectables
    this.$mdSidenav = $mdSidenav;
    this.UsersDataService = UsersDataService;
    this.UsersContactService = UsersContactService;

    // Load our users and store them to a variable
    UsersDataService.loadAllUsers().then((users:IUser[]) => {
      this.users = users;
      this.selected = users[0];
    });
  }
  
  /**
   * Hide or Show the 'left' sideNav area.
   */
  toggleUsersList() {
    this.$mdSidenav('left').toggle();
  }

  /**
   * Select the current user and closes the users list.
   *
   * @param user The user to be selected.
   */
  selectUser(user:number|IUser) {
    // Set our selected user
    this.selected = angular.isNumber(user) ? this.users[<number> user] : <IUser> user;

    // If the users list/sidenav is open; we want to make sure to close it
    this.$mdSidenav('left').close();
  }

  /**
   * Ask the UsersDataService to share with this user.
   *
   * @param $event The MouseEvent that fired this action.
   */
  share($event:MouseEvent) {
    this.UsersContactService.share($event, this.selected);
  }
}
