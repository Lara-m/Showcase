package myapplication


/**
 * Created by lara on 19/09/17.
 */
import android.content.Context
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import android.widget.Toast

// https://www.mytrendin.com/swipeable-recyclerview-android-using-kotlin/


class CustomAdapter(val userList: ArrayList<User>) : RecyclerView.Adapter<CustomAdapter.ViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CustomAdapter.ViewHolder {
        val v = LayoutInflater.from(parent.context).inflate(R.layout.list_layout, parent, false)
        return ViewHolder(v)
    }

    override fun onBindViewHolder(holder: CustomAdapter.ViewHolder, position: Int) {
        holder.bindItems(userList[position])
        holder.click()
    }

    override fun getItemCount(): Int {
        return userList.size
    }

    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

        fun bindItems(user: User) {
            //val elist = itemView.findViewById<View>(R.id.expandable_listview) as ExpandableListView

            val textViewName = itemView.findViewById<View>(R.id.child_name) as TextView
            val textViewAddress  = itemView.findViewById<TextView>(R.id.child_text) as TextView
            textViewName.text = user.name
            textViewAddress.text = user.address
        }
        fun click() {
            itemView.setOnClickListener{
                val textViewName = itemView.findViewById<TextView>(R.id.child_name) as TextView
                itemView.context.toast("Clicked on "+textViewName.text )
            }
        }
    }


}

fun Context.toast(message: CharSequence) =
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show()


