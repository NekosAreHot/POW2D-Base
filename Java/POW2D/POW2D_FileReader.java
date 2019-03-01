/**
*	POW2D Java Filesystem method
**/
import java.io.*; //For filesystem
public class POW2D_FileReader{
	public String readFile(String directory) throws Exception{
		FileReader file = new FileReader(directory);
		String output;
		int i = file.read();
		while(i != -1){
			output = output + (char) i;
		}
		return output;
	}
	public void writeFile(String directory,String data) throws Exception{
		
	}
}