import auth.JwtHandler;
import dto.User;
import io.jsonwebtoken.*;
import jdk.jshell.spi.ExecutionControl;
import kong.unirest.Unirest;

import javax.crypto.spec.SecretKeySpec;
import javax.security.auth.message.AuthException;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;
import java.util.Calendar;
import java.util.Locale;

@Path("/campusnet")
public class LoginService {
    @GET
    @Path("login")
    public Response login() {
        String URI = "https://auth.dtu.dk/dtu/?service=http://localhost:8080/rest/campusnet/redirect";
        return Response.seeOther(UriBuilder.fromUri(URI).build()).build();
    }

    @GET
    @Path("redirect")
    public Response callback(@QueryParam("ticket") String cnTicket) throws NotAuthorizedException {
        System.out.println(cnTicket); //Check if we got something back
        //Tjek ticket mod CampusNet
        String body = Unirest.get("https://auth.dtu.dk/dtu/validate?service=http://localhost:8080/rest/campusnet/redirect&ticket="
                        + cnTicket)
                .asString()
                .getBody();
        String jwtToken = "";
        if (validateBody(body)) {

            User user = handleUser(body);
            jwtToken = new JwtHandler().generateJwtToken(user);
            return Response.ok().entity(jwtToken).header("Authorization", "Bearer" + jwtToken).build();
        }
        return Response.status(401).build();
    }

    private boolean validateBody(String body) {
        String[] bodyArray = body.split("\n");
        if (bodyArray.length == 2 && bodyArray[0].toLowerCase().trim().equals("yes"))
            return true;
        return false;
    }

    private User handleUser(String body) {
        String[] bodyArray = body.split("\n");
        System.out.println(bodyArray[1].trim());
        return new User(bodyArray[1].trim());
    }

    @GET @Path("testtoken")
    public User testToken(@HeaderParam("Authorization") String authentication) throws JwtHandler.ExpiredLoginException, AuthException {
        System.out.println(authentication);
        User validate = new JwtHandler().validate(authentication);
        return validate;
    }
}
