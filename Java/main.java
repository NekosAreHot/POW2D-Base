package POW2D;
import POW2D.Message;
import POW2D.POW2D_FileReader;
public class main{
		public static void main(String[] args){
			/**
			*	THIS RUNS WHEN java-engine.exe IS LAUNCHED
			*	MAIN CODE GOES HERE
			**/
			Message console = new Message();
			console.sendMessage("Test!");
			console.sendWarning("Test!");
			console.sendError("Test!");
			
			POW2D_FileReader file = new POW2D_FileReader();
			System.out.println(file.readFile("C:/Users/noah.enger/Desktop/RisingLight_0_12_4/Rising Light (Updated)/package.nw/Java/main.java"));
		}
}