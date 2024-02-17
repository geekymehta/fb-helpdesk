// import { useEffect } from "react";
// import FacebookLogin from "react-facebook-login";
// import { FacebookLoginButton } from "react-social-login-buttons";

// const App = () => {
//   const clientId = "930876614928754";
//   const redirectUri = "http://localhost:5173";
//   const uri = `https://www.facebook.com/v19.0/dialog/oauth?response_type=token&display=popup&client_id=${clientId}&redirect_uri=${redirectUri}?method=GET&path=122099224958215958%2Faccounts&version=v19.0&auth_type=rerequest&scope=pages_messaging`;

//   const responseAsyncFacebook = async () => {
//     // const response = await fetch(uri);
//     window.location.assign(uri);
//     console.log(response);
//   };

//   // useEffect(() => {
//   //   responseAsyncFacebook();
//   // }, [uri]);

//   const responseFacebook = (response) => {
//     console.log(response);
//   };

//   return (
//     <>
//       <div className="app"> app </div>
//       <FacebookLogin
//         appId="930876614928754"
//         autoLoad={true}
//         icon="fa-facebook"
//         scope="public_profile,pages_messaging,pages_show_list,pages_manage_metadata,pages_read_engagement"
//         callback={responseFacebook}
//       />
//       <FacebookLoginButton onClick={responseAsyncFacebook} />
//     </>
//   );
// };

// export default App;

// // const getConvoUri = `https://graph.facebook.com/v19.0/${PAGE - ID}/conversations
// //     ?fields=participants,messages{id,message}
// //     &access_token=${PAGE - ACCESS - TOKEN}`;
// https://graph.facebook.com/v19.0/217391334799391/conversations
// ?fields=participants,messages{id,message}
// &access_token=EAANOoJn2aXIBOyJuHoIKl1ZBoD7fNFNZCqHBvbupuyhZBsWRjkFNKuH5wZB8edJZCNF7Llt34LD24n6SlMrT4U5JpB51qXeMdddZArDywXdzm2cHz43JHI2jS8m3P9clZCAYDGCWPf8TGQFWaCVN3it36LZCXsthsi2FrQusxfKw16uzpviZAq9ZBgqdmMfWzXRMWHPLwkzeLaFmOIj7ExecyrNdJzrxRvpfYZD

// //output {
// // {
// //   "data": [
// //     {
// //       "participants": {
// //         "data": [
// //           {
// //             "name": "CUSTOMER-NAME",
// //             "email": "PSID@facebook.com",
// //             "id": "PSID"
// //           },
// //           {
// //             "name": "PAGE-NAME",
// //             "email": "PAGE-ID@facebook.com",
// //             "id": "PAGE-ID"
// //           }
// //         ]
// //       },
// //       "id": "t_10224..."   //Conversation ID
// //     }
// //   ]
// // },
// //       "messages": {
// //         "data": [
// //           {
// //             "id": "m_MeS2...",   //Message ID
// //             "message": "hello"
// //           },
// //           {
// //             "id": "m_Nl1...",  //Message ID
// //             "message": "CUSTOMER-NAME used Chat Plugin to start this conversation. Learn more"
// //           }
// //         ],
// //       },
// //       "id": "t_10224..."
// //     },

//Get the PSID & Message ID:-
// https://graph.facebook.com/LATEST-API-VERSION/PAGE-ID/conversations
//     ?fields=participants,messages{id,message}
//     &access_token=PAGE-ACCESS-TOKEN
// test:
// https://graph.facebook.com/v19.0/221152467754903/conversations
//     ?fields=participants,messages{id,message}
//     &access_token=EAANOoJn2aXIBO8ZC8ZCgJNxQxar1gqQlPX9emKKLdxxZBZBriFFD16ZArT6ZAf0ZBqFGCEk27g4CKmiBE8Vc6d2aJ1kPth2CUPHACrseskazSsIL1477pZBbX1sZAdV5X17EHJ4ZBJ6rZBMe2JTYzmZBDVU51wRKd2ZAKQRkwhGy7JdOwXIFdBEwpjhTVq8bjTCDPxjHuTScaGZBvZAZCQJwTEZAXZBBQM92ldIkjH2ZBwZD

// Send the Customer a Message:-
// https://graph.facebook.com/LATEST-API-VERSION/PAGE-ID/messages
//     ?recipient={id:PSID}
//     &message={text:'You did it!'}
//     &messaging_type=RESPONSE
//     &access_token=PAGE-ACCESS-TOKEN

// pagination_and_cursor
// To use pagination with cursors in the Facebook Graph API, you can include the after or before cursor as a parameter in your API request. This allows you to retrieve the next or previous page of data.
// Here's how you can modify your existing API request to include the after cursor for pagination
// The 'after' cursor from the previous API response
// let afterCursor = 'QVFIUkhTT18tOVJaTklMMmtVNVlaMW1sY08wM1lrZAndxRGh3RktMMWV1RU9qN29XYl9hVDBfRzVJd0w5c1NUaXlTZAC1pRGpHS1A4aW1wT0JyekdsQWFkRU1TbkF4NzJXR29iVGxCUmtrSUEyQktybFdTREZAwN09VTU9CeVdSN2RVYk4x';
// let url = `https://graph.facebook.com/v19.0/217391334799391/conversations?fields=participants,messages{id,message}&access_token=<YourAccessToken>&after=${afterCursor}`;

// isSillohette = true && href="https://scontent.fdel5-2.fna.fbcdn.net/v/t1.30497-…6EQkl6ZD01R-u6Dt16AEA8ZwKEH9CgiM4vYYw&oe=65F79619";

// `https://scontent.fdel11-4.fna.fbcdn.net/v/t1.30497-1/84628273_176159830277856_972693363922829312_n.jpg?stp=c15.0.50.50a_cp0_dst-jpg_p50x50&_nc_cat=1&ccb=1-7&_nc_sid=810bd0&_nc_ohc=1IEA7QUVPPQAX-G0KdA&_nc_ht=scontent.fdel11-4.fna&edm=AP4hL3IEAAAA&oh=00_AfCCrl4pLe7ch3ZC-e7Hyrs4oSp93qjKbMXTElagDFp9xA&oe=65F83ED9`
