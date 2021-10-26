import jdk.jshell.spi.ExecutionControl;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;

@Path("test")
public class TestService {
    @GET
    public String getTest(){
        return "Hello World!";
    }

    @GET
    @Path("queryFood")
    public String queryFood(@QueryParam("name") String name) throws NoImplementationException{
        throw new NoImplementationException("queryFood not implemented yet");
    }
}

