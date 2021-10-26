package auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import dto.User;
import io.jsonwebtoken.*;

import javax.crypto.spec.SecretKeySpec;
import javax.security.auth.message.AuthException;
import javax.ws.rs.NotAuthorizedException;
import java.security.Key;
import java.util.Calendar;

public class JwtHandler {
    private static final int TOKEN_EXPIRY = 28000;
    private static final String mySecret = "secret";
    private static Key getKey(){
        return new SecretKeySpec(mySecret.getBytes(),0,mySecret.length(),"HS512");
    }

    public String generateJwtToken(User user){
        Calendar expiry = Calendar.getInstance();
        expiry.add(Calendar.MINUTE, TOKEN_EXPIRY);
        return Jwts.builder().setIssuer("KamelBoys")
                .claim("user",user)
                .signWith(SignatureAlgorithm.HS512, getKey())
                .setExpiration(expiry.getTime())
                .compact();
    }

    public static class ExpiredLoginException extends Exception {
        public ExpiredLoginException(String string) { super(string);
        }
    }

    public static User validate(String authentication) {
        String[] tokenArray = authentication.split(" ");
        String token = tokenArray[tokenArray.length - 1];
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(getKey())
                    .parseClaimsJws(token)
                    .getBody();
            ObjectMapper mapper = new ObjectMapper();
            User user = mapper.convertValue(claims.get("user"), User.class);
            System.out.println(user);
            return user;
        } catch (JwtException e){
            System.out.println(e.getClass() +":  "+ e.getMessage() );
            throw new NotAuthorizedException(e.getMessage());
        }


    }

}
