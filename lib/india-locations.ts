export interface MandalMap {
  [districtName: string]: string[];
}

export interface IndiaLocationHierarchy {
  [stateName: string]: MandalMap;
}

export const INITIAL_INDIA_LOCATIONS: IndiaLocationHierarchy = {
  "Telangana (తెలంగాణ)": {
    "Hyderabad (హైదరాబాద్)": [
      "Secunderabad (సికింద్రాబాద్)",
      "Ameerpet (అమీర్‌పేట్)",
      "Khairatabad (ఖైరతాబాద్)",
      "Charminar (చార్మినార్)",
      "Musheerabad (ముషీరాబాద్)",
      "Amberpet (అంబర్‌పేట్)",
      "Golconda (గోల్కొండ)"
    ],
    "Rangareddy (రంగారెడ్డి)": [
      "Serilingampally (శేరిలింగంపల్లి)",
      "Rajendranagar (రాజేంద్రనగర్)",
      "Ibrahimpatnam (ఇబ్రహీంపట్నం)",
      "Chevella (చేవెళ్ల)",
      "Shadnagar (షాద్‌నగర్)",
      "Maheshwaram (మహేశ్వరం)"
    ],
    "Warangal (వరంగల్)": [
      "Warangal (వరంగల్)",
      "Khila Warangal (ఖిలా వరంగల్)",
      "Narsampet (నర్సంపేట)",
      "Wardhannapet (వర్ధన్నపేట)",
      "Parvathagiri (పర్వతగిరి)"
    ],
    "Hanumakonda (హనుమకొండ)": [
      "Hanumakonda (హనుమకొండ)",
      "Kazipet (కాజీపేట)",
      "Parkal (పరకాల)",
      "Hasanparthy (హసన్‌పర్తి)",
      "Kamalapur (కమలాపూర్)"
    ],
    "Karimnagar (కరీంనగర్)": [
      "Karimnagar Urban (కరీంనగర్ అర్బన్)",
      "Karimnagar Rural (కరీంనగర్ రూరల్)",
      "Huzurabad (హుజూరాబాద్)",
      "Jammikunta (జమ్మికుంట)",
      "Choppadandi (చొప్పదండి)",
      "Manakondur (మానకొండూర్)"
    ],
    "Khammam (ఖమ్మం)": [
      "Khammam Urban (ఖమ్మం అర్బన్)",
      "Madhira (మధిర)",
      "Wyra (వైరా)",
      "Sathupalli (సత్తుపల్లి)",
      "Kalluru (కల్లూరు)",
      "Kusumanchi (కూసుమంచి)"
    ],
    "Nizamabad (నిజామాబాద్)": [
      "Nizamabad North (నిజామాబాద్ నార్త్)",
      "Armoor (ఆర్మూర్)",
      "Bodhan (బోధన్)",
      "Balkonda (బాల్కొండ)",
      "Dichpally (డిచ్‌పల్లి)"
    ],
    "Nalgonda (నల్లగొండ)": [
      "Nalgonda (నల్లగొండ)",
      "Miryalaguda (మిర్యాలగూడ)",
      "Devarakonda (దేవరకొండ)",
      "Nakrekal (నకిరేకల్)",
      "Chityala (చిట్యాల)"
    ],
    "Mahabubnagar (మహబూబ్ నగర్)": [
      "Mahabubnagar Urban (మహబూబ్ నగర్)",
      "Jadcherla (జడ్చర్ల)",
      "Devarkadra (దేవరకద్ర)",
      "Bhoothpur (భూత్పూర్)"
    ],
    "Siddipet (సిద్దిపేట)": [
      "Siddipet Urban (సిద్దిపేట అర్బన్)",
      "Gajwel (గజ్వేల్)",
      "Husnabad (హుస్నాబాద్)",
      "Dubbaka (దుబ్బాక)",
      "Chinnakodur (చిన్నకోడూరు)"
    ]
  },
  "Andhra Pradesh (ఆంధ్రప్రదేశ్)": {
    "NTR Vijayawada (ఎన్టీఆర్ విజయవాడ)": [
      "Vijayawada Central (విజయవాడ సెంట్రల్)",
      "Vijayawada Rural (విజయవాడ రూరల్)",
      "Mylavaram (మైలవరం)",
      "Nandigama (నందిగామ)",
      "Jaggaiahpet (జగ్గయ్యపేట)",
      "Tiruvuru (తిరువూరు)",
      "Ibrahimpatnam AP (ఇబ్రహీంపట్నం)"
    ],
    "Guntur (గుంటూరు)": [
      "Guntur East (గుంటూరు ఈస్ట్)",
      "Guntur West (గుంటూరు వెస్ట్)",
      "Mangalagiri (మంగళగిరి)",
      "Tadikonda (తాడికొండ)",
      "Tenali (తెనాలి)",
      "Ponnur (పొన్నూరు)",
      "Prathipadu (ప్రత్తిపాడు)"
    ],
    "Visakhapatnam (విశాఖపట్నం)": [
      "Visakhapatnam Urban (విశాఖ అర్బన్)",
      "Gajuwaka (గాజువాక)",
      "Bheemunipatnam (భీమునిపట్నం)",
      "Anandapuram (ఆనందపురం)",
      "Pendurthi (పెందుర్తి)"
    ],
    "Tirupati (తిరుపతి)": [
      "Tirupati Urban (తిరుపతి అర్బన్)",
      "Tirupati Rural (తిరుపతి రూరల్)",
      "Chandragiri (చంద్రగిరి)",
      "Srikalahasti (శ్రీకాళహస్తి)",
      "Gudur (గూడూరు)",
      "Sullurpeta (సూళ్లూరుపేట)"
    ],
    "East Godavari (తూర్పు గోదావరి)": [
      "Rajahmundry Urban (రాజమండ్రి అర్బన్)",
      "Rajahmundry Rural (రాజమండ్రి రూరల్)",
      "Kovvur (కొవ్వూరు)",
      "Nidadavole (నిడదవోలు)",
      "Rajanagaram (రాజానగరం)",
      "Anaparthi (అనపర్తి)"
    ],
    "Kurnool (కర్నూలు)": [
      "Kurnool Urban (కర్నూలు అర్బన్)",
      "Adoni (ఆదోని)",
      "Yemmiganur (ఎమ్మిగనూరు)",
      "Kodumur (కోడుమూరు)",
      "Pattikonda (పత్తికొండ)"
    ],
    "Nellore (నెల్లూరు)": [
      "Nellore Urban (నెల్లూరు అర్బన్)",
      "Kavali (కావలి)",
      "Kovur (కోవూరు)",
      "Atmakur (ఆత్మకూరు)",
      "Kandukur (కందుకూరు)"
    ],
    "Anantapur (అనంతపురం)": [
      "Anantapur Urban (అనంతపురం)",
      "Hindupur (హిందూపురం)",
      "Tadipatri (తాడిపత్రి)",
      "Guntakal (గుంతకల్లు)",
      "Rayadurg (రాయదుర్గం)"
    ]
  },
  "Delhi NCR (ఢిల్లీ / दिल्ली)": {
    "New Delhi (న్యూఢిల్లీ)": [
      "Connaught Place (కన్నాట్ ప్లేస్)",
      "Chanakyapuri (చాణక్యపురి)",
      "Parliament Street (పార్లమెంట్ స్ట్రీట్)",
      "Vasant Vihar (వసంత్ విహార్)"
    ],
    "Central Delhi (సెంట్రల్ ఢిల్లీ)": [
      "Karol Bagh (కరోల్ బాగ్)",
      "Civil Lines (సివిల్ లైన్స్)",
      "Kotwali (కొత్వాలి)"
    ]
  },
  "Karnataka (కర్ణాటక / कर्नाटक)": {
    "Bengaluru Urban (బెంగళూరు)": [
      "Bengaluru North (బెంగళూరు నార్త్)",
      "Bengaluru South (బెంగళూరు సౌత్)",
      "Yelahanka (యలహంక)",
      "Anekal (అనేకల్)"
    ],
    "Ballari (బళ్లారి)": [
      "Ballari Urban (బళ్లారి అర్బన్)",
      "Siruguppa (సిరుగుప్ప)",
      "Sandur (సండూరు)"
    ],
    "Raichur (రాయచూరు)": [
      "Raichur (రాయచూరు)",
      "Sindhanur (సింధనూరు)",
      "Manvi (మాన్వి)"
    ]
  },
  "Tamil Nadu (తమిళనాడు / तमिलनाडु)": {
    "Chennai (చెన్నై)": [
      "Egmore (ఎగ్మోర్)",
      "Mylapore (మైలాపూర్)",
      "Guindy (గిండి)",
      "Tondiarpet (తొండియార్‌పేట్)"
    ],
    "Coimbatore (కోయంబత్తూరు)": [
      "Coimbatore North (కోయంబత్తూరు నార్త్)",
      "Pollachi (పొల్లాచ్చి)",
      "Mettupalayam (మెట్టుపాళయం)"
    ]
  },
  "Maharashtra (మహారాష్ట్ర / महाराष्ट्र)": {
    "Mumbai (ముంబై)": [
      "Andheri (అంధేరి)",
      "Bandra (బాంద్రా)",
      "Dadar (దాదర్)",
      "Colaba (కొలాబా)"
    ],
    "Pune (పుణె)": [
      "Pune City (పుణె సిటీ)",
      "Haveli (హవేలీ)",
      "Baramati (బారామతి)"
    ],
    "Nanded (నాందేడ్)": [
      "Nanded (నాందేడ్)",
      "Dharmabad (ధర్మాబాద్)",
      "Bhokar (భోకర్)"
    ]
  },
  "Uttar Pradesh (ఉత్తరప్రదేశ్ / उत्तर प्रदेश)": {
    "Lucknow (లక్నో)": [
      "Lucknow Sadar (లక్నో సదర్)",
      "Mohanlalganj (మోహన్‌లాల్‌గంజ్)",
      "Malihabad (మలిహాబాద్)"
    ],
    "Varanasi (వారణాసి)": [
      "Varanasi Sadar (వారణాసి సదర్)",
      "Pindra (పిండ్రా)",
      "Raja Talab (రాజా తలాబ్)"
    ]
  },
  "Gujarat (గుజరాత్ / गुजरात)": {
    "Ahmedabad (అహ్మదాబాద్)": [
      "Ahmedabad City (అహ్మదాబాద్ సిటీ)",
      "Sanand (సనంద్)",
      "Daskroi (దస్క్రోయ్)"
    ],
    "Surat (సూరత్)": [
      "Surat City (సూరత్ సిటీ)",
      "Bardoli (బార్డోలి)"
    ]
  },
  "West Bengal (పశ్చిమ బెంగాల్ / पश्चिम बंगाल)": {
    "Kolkata (కోల్‌కతా)": [
      "Ballygunge (బালিగంజ్)",
      "Alipore (అలీపూర్)",
      "Salt Lake (సాల్ట్ లేక్)"
    ]
  },
  "Rajasthan (రాజస్థాన్ / राजस्थान)": {
    "Jaipur (జైపూర్)": [
      "Jaipur City (జైపూర్ సిటీ)",
      "Amer (అమేర్)",
      "Sanganer (సంగానేర్)"
    ]
  },
  "Madhya Pradesh (మధ్యప్రదేశ్ / मध्य प्रदेश)": {
    "Bhopal (భోపాల్)": [
      "Huzur (హుజూర్)",
      "Berasia (బెరాసియా)"
    ]
  },
  "Kerala (కేరళ / केरल)": {
    "Thiruvananthapuram (తిరువనంతపురం)": [
      "Thiruvananthapuram (తిరువనంతపురం)",
      "Neyyattinkara (నెయ్యట్టింకర)"
    ]
  },
  "Odisha (ఒడిశా / ओडिशा)": {
    "Khordha (ఖోర్ధా)": [
      "Bhubaneswar (భువనేశ్వర్)",
      "Jatani (జటాని)"
    ],
    "Ganjam (గంజాం)": [
      "Berhampur (బెర్హంపూర్)",
      "Chhatrapur (ఛత్రపూర్)"
    ]
  },
  "Bihar (బీహార్ / बिहार)": {
    "Patna (పాట్నా)": [
      "Patna Sadar (పాట్నా సదర్)",
      "Danapur (దానాపూర్)"
    ]
  },
  "Punjab (పంజాబ్ / पंजाब)": {
    "Amritsar (అమృత్‌సర్)": [
      "Amritsar I (అమృత్‌సర్)",
      "Ajnala (అజ్నాలా)"
    ]
  },
  "Haryana (హర్యానా / हरियाणा)": {
    "Gurugram (గురుగ్రామ్)": [
      "Gurugram (గురుగ్రామ్)",
      "Sohna (సోహ్నా)"
    ]
  },
  "Chhattisgarh (ఛత్తీస్‌గఢ్ / छत्तीसगढ़)": {
    "Raipur (రాయ్‌పూర్)": [
      "Raipur (రాయ్‌పూర్)",
      "Arang (ఆరంగ్)"
    ]
  },
  "Jharkhand (జార్ఖండ్ / झारखंड)": {
    "Ranchi (రాంచీ)": [
      "Ranchi (రాంచీ)",
      "Kanke (కాంకే)"
    ]
  },
  "Assam (అస్సాం / असम)": {
    "Kamrup Metro (గౌహతి)": [
      "Guwahati (గౌహతి)",
      "Dispur (దిస్పూర్)"
    ]
  },
  "Himachal Pradesh (హిమాచల్ ప్రదేశ్)": {
    "Shimla (సిమ్లా)": ["Shimla Urban (సిమ్లా అర్బన్)", "Rohru (రోహ్రు)"]
  },
  "Uttarakhand (ఉత్తరాఖండ్)": {
    "Dehradun (డెహ్రాడూన్)": ["Dehradun (డెహ్రాడూన్)", "Rishikesh (రిషికేశ్)"]
  },
  "Goa (గోవా)": {
    "North Goa (నార్త్ గోవా)": ["Panaji (పనాజీ)", "Mapusa (మపుసా)"]
  },
  "Tripura (త్రిపుర)": {
    "West Tripura (వెస్ట్ త్రిపుర)": ["Agartala (అగర్తలా)"]
  },
  "Manipur (మణిపూర్)": {
    "Imphal West (ఇంఫాల్)": ["Imphal (ఇంఫాల్)"]
  },
  "Meghalaya (మేఘాలయ)": {
    "East Khasi Hills (షిల్లాంగ్)": ["Shillong (షిల్లాంగ్)"]
  },
  "Nagaland (నాగాలాండ్)": {
    "Kohima (కోహిమా)": ["Kohima Sadar (కోహిమా)"]
  },
  "Arunachal Pradesh (అరుణాచల్ ప్రదేశ్)": {
    "Papum Pare (ఇటానగర్)": ["Itanagar (ఇటానగర్)"]
  },
  "Mizoram (మిజోరం)": {
    "Aizawl (ఐజ్వాల్)": ["Aizawl North (ఐజ్వాల్)"]
  },
  "Sikkim (సిక్కిం)": {
    "Gangtok (గాంగ్‌టక్)": ["Gangtok (గాంగ్‌టక్)"]
  }
};
