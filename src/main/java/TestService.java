import javax.ws.rs.GET;
import javax.ws.rs.Path;

@Path("Test")
public class TestService {
    @GET
    public String getTest(){
        return "Hello World!";
    }
}
