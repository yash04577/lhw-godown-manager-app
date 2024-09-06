import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'
import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'

const acceptedOrderPurchase = () => {

    const salesBill = useSelector((state:any)=>state?.estimateSales?.salesBill);

    useEffect(() => {
     console.log("dataaaa milaaa ", salesBill)
     console.log("loading milaaa ", salesBill?.items[0]?.salesOrder?.loadingDetails[0])
    }, [salesBill])

    const getNetRate = (rate:any, dispatchQuantity:any, gst:any) =>{

        const taxableValue = rate * dispatchQuantity;
        const netRate = taxableValue + (taxableValue * gst/100);
        return netRate.toFixed(0);
    }
    

  return (
    <ScrollView>
    <View className='w-[90%] mx-auto'>
      <View className='w-full my-5 bg-white p-5 rounded-lg'>
        <View className='flex flex-row my-5 justify-between'>
          <Text>{salesBill?.billNumber}</Text>
          <Text>{salesBill?.status}</Text>
        </View>

        <View>
          <Text>Estimate</Text>
        </View>

        <View className="flex flex-row justify-between my-5">
          <View>
            <Text>Bill To:</Text>
            <Text>{salesBill?.customer?.customerName}</Text>
            <Text>{salesBill?.customer?.address1}</Text>
            <Text>{salesBill?.customer?.address2}</Text>
            <Text>{salesBill?.customer?.phoneNumber}</Text>
          </View>

          <View>
            <Text>{salesBill?.items[0]?.salesOrder?.orderNumber}</Text>
            <Text>{salesBill?.items[0]?.salesOrder?.PoNumber}</Text>
            <Text>{salesBill?.items[0]?.salesOrder?.PaymentDay}</Text>
            <Text>{salesBill?.date}</Text>
          </View>
 
        </View>


        <View className="flex flex-row justify-between">
          <View>
          <Text>{salesBill?.items[0]?.salesOrder?.shippingAddress?.contactPerson}</Text>
          <Text>{salesBill?.items[0]?.salesOrder?.shippingAddress?.address}</Text>
          <Text>{salesBill?.items[0]?.salesOrder?.shippingAddress?.contactPersonPhoneNo}</Text>
           
          </View>

          <View>
            <Text>{salesBill?.items[0]?.salesOrder?.PaymentDay}</Text>
            <Text>{salesBill?.items[0]?.salesOrder?.paymentMethod}</Text>
          </View>
 
        </View>
      </View>

      <View className='w-full my-5 bg-white p-5 rounded-lg'>
            <Text>Loading Details</Text>
      <View className="flex flex-row justify-between my-5">
          <View>
            <Text>Loading No:</Text><Text>{salesBill?.items[0]?.salesOrder?.loadingDetails[0]?.loadingNumber}</Text>
            <Text>Vehicle No:</Text><Text>{salesBill?.items[0]?.salesOrder?.loadingDetails[0]?.vehicleNumber}</Text>
            <Text>Driver No:</Text><Text>{salesBill?.items[0]?.salesOrder?.loadingDetails[0]?.driverPhoneNumber}</Text>
            <Text>Overload:</Text><Text>{salesBill?.items[0]?.salesOrder?.loadingDetails[0]?.overload}</Text>
          </View>

          <View>
    
            <Text>Type:</Text><Text>{salesBill?.items[0]?.salesOrder?.loadingDetails[0]?.vehicleType}</Text>
            <Text>Driver:</Text><Text>{salesBill?.items[0]?.salesOrder?.loadingDetails[0]?.driverName}</Text>
            <Text>Distance:</Text><Text>{salesBill?.items[0]?.salesOrder?.loadingDetails[0]?.distance}</Text>
            <Text>Fright:</Text><Text>{salesBill?.items[0]?.salesOrder?.loadingDetails[0]?.customerFreight}</Text>
           
          </View> 
 
        </View>
      </View>


      <View className='w-full my-5 bg-white p-5 rounded-lg'>
            <Text>Additional Pricing</Text>

        <View>
        {
                salesBill?.additionalPrice?.map((element:any) => <View className='flex flex-row gap-5'>
                    <Text>{element?.fieldName}:</Text><Text>{element?.value}</Text>
                    </View>
                )
                }
        </View>
        
      <View className="flex flex-row justify-between my-5">
        
 
        </View>
      </View>

      <View>
      <FlatList
      data={salesBill?.items.length > 0 ? salesBill?.items : []}
      renderItem={({ item, index }) => <View className={`bg-white rounded-lg shadow-md p-4 mb-4 w-full mx-auto`}>
      <View className="flex-row justify-between items-center border-b border-gray-200 pb-2">
        <Text className="text-gray-700 font-medium">{index+1}</Text>
        <Text className="text-gray-700 font-medium">{item?.item?.name} ({item?.item?.code})</Text>
      </View>
      <View className="flex mt-2">
        <View className='flex flex-row justify-between'>
            <Text>Godown: </Text><Text className="text-gray-700">{item?.godown?.godownName}</Text>
        </View>
        <View className='flex flex-row justify-between'>
            <Text>Dispatch Quantity: </Text><Text className="text-gray-700">{item?.dispatchQuantity}</Text>
        </View>
        <View className='flex flex-row justify-between'>
            <Text>Rate: </Text><Text className="text-gray-700">{item?.taxableValue}</Text>
        </View>
        <View className='flex flex-row justify-between'>
            <Text>Taxable Value: </Text><Text className="text-gray-700">{(item?.taxableValue * item?.dispatchQuantity).toFixed(0)}</Text>
        </View>
        <View className='flex flex-row justify-between'>
            <Text>Gst: </Text><Text className="text-gray-700">{item?.gst}</Text>
        </View>
        <View className='flex flex-row justify-between'>
            <Text>Net Rate: </Text><Text className="text-gray-700">{getNetRate(item?.taxableValue, item?.dispatchQuantity, item?.gst)}</Text>
        </View>
      </View>
    </View>}
      keyExtractor={(index)=>index}
      />
      </View>

      <View className={`bg-white rounded-lg shadow-md p-4 mb-4 w-full mx-auto`}>
      <View className="flex-row justify-between items-center border-b border-gray-200 pb-2">
        <Text className="text-gray-700 font-medium">Total:</Text>
        <Text className="text-gray-700 font-medium">&#8377; {salesBill?.total?.toFixed(0)}</Text>
      </View>
    </View>
    </View>
    </ScrollView>
  )
}

export default acceptedOrderPurchase

const styles = StyleSheet.create({})