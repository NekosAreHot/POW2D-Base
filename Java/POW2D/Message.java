/**
*	POW2D Java Console method
**/
public class Message{
	public void sendMessage(String msg){
		System.out.println("POW2DJavaEngine: " + msg);
	}
	
	public void sendWarning(String msg){
		System.out.println("POW2DJavaEngine: [WARNING] " + msg);
	}
	
	public void sendError(String msg){
		System.out.println("POW2DJavaEngine: [ERROR] " + msg);
	}
}
