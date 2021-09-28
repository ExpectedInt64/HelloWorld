import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;

public class KamelTest {
    @Test
    void kamelTest(){
        ArrayList<String> strings = new ArrayList<>();
        strings.add("Mark");
        strings.add("Jens");
        Assertions.assertEquals("Mark",strings.get(0));
    }
}
