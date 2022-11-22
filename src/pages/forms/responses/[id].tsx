import {Layout} from "../../../features/common/Layout";
import {ResponseRecord, ResponseUserRecord} from "../../../features/types";
import {usePolybase} from "@polybase/react";
import {useCallback, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useAuth} from "../../../features/users/useAuth";
import {
  secp256k1,
  aescbc, decodeFromString,
  encodeToString,
  x25519xsalsa20poly1305
} from '@polybase/util';

const FormResponses = () => {
  const router = useRouter();
  const polybase = usePolybase();
  const { auth } = useAuth();

  const [formId, setFormId] = useState<string>(router.query.id as string);

  const responseCollectionReference = polybase.collection<ResponseRecord>('response');
  const responseUserCollectionReference = polybase.collection<ResponseUserRecord>('responseUser');

  const queryCollections = useCallback(async (formId: string) => {
    if (!auth) throw new Error('You are not authenticated');

    const responsesCollection = await responseCollectionReference.get();
    const userResponsesCollection = await responseUserCollectionReference.get();

    const formResponses = responsesCollection.data.filter(r => r.data.formId === formId)

    const userResponses = formResponses.map((resp) => {
      // get the user response where user id == owner address && response id == resp id
      return userResponsesCollection.data.find(r => r.data.responseId === resp.data.id && r.data.userId === auth.accountAddress)
    });


    const decryptedKeys = userResponses.map(async (resp) => {
      if (typeof resp !== 'undefined') {
        if (resp.data.id !== "y2KKe8FynyXoeMsaGZSYR") {
          const decodedPrivateKey = decodeFromString(auth.walletAccount.getPrivateKeyString(), 'hex');
          const symmetricKey = await secp256k1.asymmetricDecryptFromEncoding(decodedPrivateKey, resp.data.encryptedEncryptionKey, 'base64')
          console.log(symmetricKey)
        }
      }
    })
  }, [auth, responseCollectionReference, responseUserCollectionReference]);



  useEffect(() => {
    setFormId(router.query.id as string);
    queryCollections(formId).catch(() => null);
  }, [formId, queryCollections, router.query.id])

  return (
    <Layout isLoading={true}>
      aslkdjalsdk
    </Layout>
  )
};

export default FormResponses;
