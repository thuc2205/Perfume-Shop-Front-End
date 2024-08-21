import{
    IsString,
    IsNotEmpty,
    IsPhoneNumber
    ,IsDate
} from 'class-validator'
export class RegisterDTO{
    @IsString()
    fullname: String;
    @IsPhoneNumber()
      phone_number : String ;
      @IsString()
      address : String;
      @IsString()
       password: String;
       @IsString()
       retype_password : String;
       @IsDate()
       birth : Date;
       @IsString()
       facebook_id: number;
       google_id:number;
       role_id:number;
       constructor(data : any){
        this.fullname = data.fullName;
        this.phone_number = data.phone_number;
        this.address = data.address;
        this.retype_password = data.retype_Password;
        this.birth = data.birth;
        this.password = data.password;
        this.facebook_id = data.facebook_id || 0;
        this.google_id = data.google_id ||0;
        this.role_id = data.role_id ||1;
       }
}