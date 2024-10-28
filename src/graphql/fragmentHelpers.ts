import { DocumentNode, TypedDocumentNode, useFragment, UseFragmentOptions } from "@apollo/client"
import type { DocumentTypeDecoration } from "@graphql-typed-document-node/core"
import { Kind } from "graphql"
import { FragmentType, unmaskFragmentData } from "./generated"

type GraphQLFragment<TType, TVars> = TypedDocumentNode<TType, TVars>
type MaskedFragment<TType, TVars> = FragmentType<DocumentTypeDecoration<TType, TVars>>

export function useSafeFragment<TType, TVars>(
  fragment: GraphQLFragment<TType, TVars>,
  from: MaskedFragment<TType, TVars>,
  options?: UseFragmentOptions<TType, TVars>
): TType
export function useSafeFragment<TType, TVars>(
  fragment: GraphQLFragment<TType, TVars>,
  from: MaskedFragment<TType, TVars> | undefined,
  options?: UseFragmentOptions<TType, TVars>
): TType | undefined
export function useSafeFragment<TType, TVars>(
  fragment: GraphQLFragment<TType, TVars>,
  from: MaskedFragment<TType, TVars> | undefined | null,
  options?: UseFragmentOptions<TType, TVars>
): TType | undefined | null
export function useSafeFragment<TType, TVars>(
  fragment: GraphQLFragment<TType, TVars>,
  from: MaskedFragment<TType, TVars> | undefined | null,
  options?: UseFragmentOptions<TType, TVars>
): TType | undefined | null {
  const firstFragmentName = fragment.definitions.find((d) => d.kind === Kind.FRAGMENT_DEFINITION)
    ?.name.value
  const result = useFragment<TType, TVars>({
    fragmentName: firstFragmentName,
    fragment: fragment as DocumentNode,
    from: from ?? {},
    ...options,
  })
  if (result.complete) {
    return result.data
  }
  return from
}

export function makeFragmentUnmasker<TType>(_documentNode: DocumentTypeDecoration<TType, any>) {
  // return non-nullable if `fragmentType` is non-nullable
  function _makeFragmentUnmasker(
    fragmentType: FragmentType<DocumentTypeDecoration<TType, any>>
  ): TType
  // return nullable if `fragmentType` is undefined
  function _makeFragmentUnmasker(
    fragmentType: FragmentType<DocumentTypeDecoration<TType, any>> | undefined
  ): TType | undefined
  // return nullable if `fragmentType` is nullable
  function _makeFragmentUnmasker(
    fragmentType: FragmentType<DocumentTypeDecoration<TType, any>> | null
  ): TType | null
  // return nullable if `fragmentType` is nullable or undefined
  function _makeFragmentUnmasker(
    fragmentType: FragmentType<DocumentTypeDecoration<TType, any>> | null | undefined
  ): TType | null | undefined
  // return array of non-nullable if `fragmentType` is array of non-nullable
  function _makeFragmentUnmasker(
    fragmentType: Array<FragmentType<DocumentTypeDecoration<TType, any>>>
  ): TType[]
  // return array of nullable if `fragmentType` is array of nullable
  function _makeFragmentUnmasker(
    fragmentType: Array<FragmentType<DocumentTypeDecoration<TType, any>>> | null | undefined
  ): TType[] | null | undefined
  // return readonly array of non-nullable if `fragmentType` is array of non-nullable
  function _makeFragmentUnmasker(
    fragmentType: ReadonlyArray<FragmentType<DocumentTypeDecoration<TType, any>>>
  ): readonly TType[]
  // return readonly array of nullable if `fragmentType` is array of nullable
  function _makeFragmentUnmasker(
    fragmentType: ReadonlyArray<FragmentType<DocumentTypeDecoration<TType, any>>> | null | undefined
  ): readonly TType[] | null | undefined
  function _makeFragmentUnmasker(
    fragmentType:
      | FragmentType<DocumentTypeDecoration<TType, any>>
      | Array<FragmentType<DocumentTypeDecoration<TType, any>>>
      | ReadonlyArray<FragmentType<DocumentTypeDecoration<TType, any>>>
      | null
      | undefined
  ): TType | TType[] | readonly TType[] | null | undefined {
    return unmaskFragmentData(_documentNode, fragmentType)
  }

  return _makeFragmentUnmasker
}
