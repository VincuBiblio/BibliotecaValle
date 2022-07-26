export class Personausuario{
  id?:Number;
  cedula?:String;
  apellidos?:String;
  nombres?:String;
  fechaNacimiento?:Date;
  edad?:String;
  genero?:String;
  telefono?:String;
  email?:String;
  clave?:String;


  //CLIENTE
  idCliente?:Number;
  estadoCivil?:String;
  discapacidad?:boolean;
  idBarrio?:Number;
  idCanton?:Number;
  idProvincia?:Number
  idParroquia?:Number;

}
export class Clientecurso{
  curso_id?:Number;
  cliente_id?:Number;
}
