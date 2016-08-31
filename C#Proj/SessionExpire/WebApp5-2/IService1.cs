using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace WebApp5_2
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IService1" in both code and config file together.
    [ServiceContract(SessionMode=SessionMode.Required)]
    public interface IService1
    {
        [OperationContract(IsOneWay=true)]
        bool addToShoppingCard(PRODUCT p);

        [OperationContract(IsOneWay = true)]
        void modifyQuantity(String pid, int quantity);

        [OperationContract(IsOneWay = true)]
        void removeItem(String pid);

        [OperationContract(IsOneWay = true)]
        List<PRODUCT> displayAll();

        [OperationContract(IsOneWay = true)]
        decimal totalAmount();

        //
    }
}
