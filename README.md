# Run using docker

Application can be run using docker:<br>
<br>
(sudo) docker pull rururu387/alpha-task:frontend-v1.0 <br>
(sudo) docker run -d -it -p 4200:80 rururu387/alpha-task:frontend-v1.0 <br>
<br>
Visit localhost:4200 once it starts. And don't forget to launch [backend server](https://github.com/rururu387/AlphaTaskBackend).

# AlphaTaskFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.3 (current version 14.0.2).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
Build docker image: (sudo) docker build --no-cache -t rururu387/alpha-task:frontend-v1.0 .

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.