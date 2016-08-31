<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="WebApp5_2._Default" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">
    <section class="featured">
        <div class="content-wrapper">
            <hgroup class="title">
                <h1><%: Title %></h1>
            </hgroup>
        </div>
    </section>
</asp:Content>
<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <div>
       <asp:Table runat="server" ID="table">
           <asp:TableHeaderRow>
               <asp:TableHeaderCell>
                   Shopping Card
               </asp:TableHeaderCell>
           </asp:TableHeaderRow>
            <asp:TableRow>
                <asp:TableCell>
                    Insert
                </asp:TableCell>
            </asp:TableRow>
           <asp:TableRow>
               <asp:TableCell>
                   <asp:TextBox runat="server" ID="pid" placeholder="ProductID"/>
                   <asp:TextBox runat="server" ID="name" placeholder="Name"/>
                   <asp:TextBox runat="server" ID="quantity" placeholder="Quantity" value="0"/>
                   <asp:TextBox runat="server" ID="cost" placeholder="Cost" OnTextChanged="cost_TextChanged"/>
                   <asp:TextBox runat="server" ID="sellingprice" placeholder="SellingPrice" OnTextChanged="sellingprice_TextChanged"/>
                   <asp:RegularExpressionValidator ID="RegularExpressionValidator1" ControlToValidate="quantity" runat="server" ErrorMessage="Only Numbers allowed" ValidationExpression="\d+"></asp:RegularExpressionValidator>
               </asp:TableCell>
           </asp:TableRow>
           <asp:TableRow>
               <asp:TableCell>
                   <asp:Button runat="server" Text="Insert" OnClick="insert"/>
               </asp:TableCell>
           </asp:TableRow>
           <asp:TableRow>
               <asp:TableCell>
                   Update Quantity
               </asp:TableCell>
           </asp:TableRow>
           <asp:TableRow>
               <asp:TableCell>
                   <asp:TextBox runat="server" ID="update_pid" placeholder="ProductID"/>
                   <asp:TextBox runat="server" ID="update_quantity" placeholder="Quantity"/>
               </asp:TableCell>
           </asp:TableRow>
            <asp:TableRow>
               <asp:TableCell>
                   <asp:Button runat="server" Text="Update" OnClick="update"/>
               </asp:TableCell>
           </asp:TableRow>
           <asp:TableRow>
               <asp:TableCell>
                   Remove Item
               </asp:TableCell>
           </asp:TableRow>
           <asp:TableRow>
               <asp:TableCell>
                   <asp:TextBox runat="server" ID="remove_pid" placeholder="ProductID"/>
               </asp:TableCell>
           </asp:TableRow>
            <asp:TableRow>
               <asp:TableCell>
                   <asp:Button runat="server" Text="Remove" OnClick="remove"/>
               </asp:TableCell>
           </asp:TableRow>
           <asp:TableRow>
               <asp:TableCell>
                   <asp:GridView ID="GridView1" runat="server"
                        CssClass="DataWebControlStyle">
                        <HeaderStyle CssClass="HeaderStyle" />
                        <AlternatingRowStyle CssClass="AlternatingRowStyle" />
                    </asp:GridView>
               </asp:TableCell>
           </asp:TableRow>
           <asp:TableRow>
               <asp:TableCell>
                   Total Amout:
                   <Input type="text" disabled="disabled" id="Total_Label" runat="server"/>
               </asp:TableCell>
           </asp:TableRow>
       </asp:Table>
   </div>

</asp:Content>
<%@ Import Namespace="WebApp5_2" %>
<script lang="C#" runat ="server">
    Service1 handler = new Service1();
    void Page_Load(Object sender, EventArgs e)
    {
        GridView1.DataSource = handler.displayAll();
        GridView1.DataBind();
        Total_Label.Value = handler.totalAmount().ToString();
    }

    void insert(Object sender, EventArgs e)
    {
        if (pid.Text.ToCharArray().Length == 0 || pid.Text.ToCharArray()[0] == ' ')
        {
            //an alert has not been implemented due to simplicity and avoiding unnecessary items, but can be implemented here.
            return;
        }
        else
        {
            PRODUCT p = new PRODUCT();
            p.ProductID = pid.Text;
            p.Name = name.Text;
            p.Quantity = int.Parse(quantity.Text);
            p.Cost = decimal.Parse(cost.Text);
            p.SellingPrice = decimal.Parse(sellingprice.Text);
            handler.addToShoppingCard(p);

            GridView1.DataSource = handler.displayAll();
            GridView1.DataBind();
            Total_Label.Value = handler.totalAmount().ToString();
        }
    }
    void update(Object sender, EventArgs e)
    {
        handler.modifyQuantity(update_pid.Text,int.Parse(update_quantity.Text));
        GridView1.DataSource = handler.displayAll();
        GridView1.DataBind();
        Total_Label.Value = handler.totalAmount().ToString();
    }
    void remove(Object sender, EventArgs e)
    {
            handler.removeItem(remove_pid.Text);
            GridView1.DataSource = handler.displayAll();
            GridView1.DataBind();
            Total_Label.Value = handler.totalAmount().ToString();
    }

    protected void cost_TextChanged(object sender, EventArgs e)
    {
            if (!Regex.IsMatch(cost.Text, @"[0-9]+(\.[0-9][0-9]?)?"))
                cost.BackColor = System.Drawing.Color.Red;

            decimal value;
            if (!decimal.TryParse(cost.Text, out value))
                cost.BackColor = System.Drawing.Color.Red;
    }

    protected void sellingprice_TextChanged(object sender, EventArgs e)
    {
        if (!Regex.IsMatch(sellingprice.Text, @"[0-9]+(\.[0-9][0-9]?)?"))
            sellingprice.BackColor = System.Drawing.Color.Red;

        decimal value;
        if (!decimal.TryParse(sellingprice.Text, out value))
            sellingprice.BackColor = System.Drawing.Color.Red;
     }
        
</script>