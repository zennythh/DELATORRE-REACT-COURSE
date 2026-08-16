import dayjs from 'dayjs'

export function DeliveryDate({ cartItem, deliveryOpts }){
  const selectedDelivery = deliveryOpts
  .find((deliveryOption)=>{
    return deliveryOption.id === cartItem.deliveryOptionId
  })
  
  return (
    <div className="delivery-date">
      Delivery date: {dayjs(selectedDelivery.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
    </div>
  );
}