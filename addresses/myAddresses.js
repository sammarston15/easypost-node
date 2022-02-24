// My example addresses //

// US (EasyPost)
const fromAddress = new api.Address({
  company: 'EasyPost',
  street1: '417 Montgomery Street',
  street2: '5th Floor',
  city: 'San Francisco',
  state: 'CA',
  zip: '94104',
  phone: '415-528-7555'
});

fromAddress.save()

// US (Briostack)
const toAddress = new api.Address({
  company: 'Briostack',
  street1: '525 S 850 E',
  street2: '#3',
  city: 'Lehi',
  state: 'UT',
  zip: '84043',
  country: 'US',
  phone: '415-528-7555'
});

toAddress.save()


// Canada
const fromAddress = new api.Address({
  company: 'Art Gallery of Ontario',
  street1: '317 Dundas St W',
  street2: '',
  city: 'Toronto',
  state: 'ON',
  zip: 'M5T 1G4',
  country: 'CA',
  phone: '415-528-7555'
});

fromAddress.save()

// Mexico
const fromAddress = new api.Address({
  company: 'test mexico address',
  street1: 'PRIVADA UNIÓN 10',
  street2: '',
  city: 'CIUDAD DE MÉXICO',
  state: 'CDMEX',
  zip: '08100',
  country: 'MX',
});

fromAddress.save()


// Germany
const fromAddress = new api.Address({
  company: 'test mexico address',
  street1: 'Mailänder Platz 7',
  street2: '',
  city: 'Stuttgart',
  state: '',
  zip: '70173',
  country: 'DE',
});

fromAddress.save()


// Germany toAddress
const toAddress = new api.Address({
  company: 'test mexico address',
  street1: 'Marktstraße 1-3',
  street2: '',
  city: 'Stuttgart',
  state: '',
  zip: '70173',
  country: 'DE',
});

toAddress.save()
