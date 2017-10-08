package inc.awesome.myapplication

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import android.support.v4.widget.SwipeRefreshLayout
import android.support.v7.widget.RecyclerView
import android.support.v7.widget.LinearLayoutManager
import android.widget.LinearLayout

class MainActivity : AppCompatActivity() {


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val swipeLayout = findViewById(R.id.swipelayout) as SwipeRefreshLayout
        swipeLayout.setOnRefreshListener{
            swipeLayout.setRefreshing(true)
            Handler().postDelayed({
                swipeLayout.setRefreshing(false)
            }, 3000)
        }
        swipeLayout.setColorSchemeResources(
                android.R.color.holo_blue_bright,
                android.R.color.holo_green_light,
                android.R.color.holo_orange_light,
                android.R.color.holo_red_light)

        val recyclerView = findViewById(R.id.recyclerView) as RecyclerView
        recyclerView.layoutManager = LinearLayoutManager(this, LinearLayout.VERTICAL, false)

        val users = ArrayList<User>()
        users.add(User("AAA", "Something something 1"))
        users.add(User("BBB", "Something something 2"))
        users.add(User("CCC", "Something something 3"))
        users.add(User("DDD", "Something something 4"))
        users.add(User("DDD", "Something something 4"))
        users.add(User("DDD", "Something something 4"))
        users.add(User("DDD", "Something something 4"))
        users.add(User("DDD", "Something something 4"))
        users.add(User("DDD", "Something something 4"))

        val adapter = CustomAdapter(users)
        recyclerView.adapter = adapter
    }
}
