 fun main(args:Array<String>){
	println("hi!")
	var c = Tiz("a")
        println(c.b())
    }


class Tiz (var a:String?){
    init{
        //this is the constructor. don't even try to mess with it.
        println("in constructor:"+a)
    }
    fun b():String{
        return "blah blah"
    }
}
