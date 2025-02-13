import React, { useState } from "react"
import History from "./history"
import { Role, Title } from "../../../../../types"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import {
  searchName,
  searchById,
  giveBooster,
  setModerator,
  giveTitle,
  ban,
  setBotManager,
  unban
} from "../../../stores/NetworkStore"
import { getAvatarSrc } from "../../../utils"
import PlayerBox from "./player-box"
import { t } from "i18next"

export default function Search() {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.lobby.searchedUser)
  const suggestions = useAppSelector((state) => state.lobby.suggestions)
  const [currentText, setCurrentText] = useState<string>("")
  const role = useAppSelector((state) => state.lobby.user?.role)
  const [title, setTitle] = useState<Title>(Title.ACE_TRAINER)

  const giveButton =
    user && role && role === Role.ADMIN ? (
      <button
        className="bubbly green"
        onClick={() => {
          dispatch(
            giveBooster({
              numberOfBoosters: Number(prompt("How many boosters ?")) || 1,
              uid: user.id
            })
          )
        }}
      >
        <p style={{ margin: "0px" }}>{t("give_boosters")}</p>
      </button>
    ) : null

  const banButton =
    user && role && (role === Role.ADMIN || role === Role.MODERATOR) ? (
      <button
        className="bubbly red"
        onClick={() => {
          dispatch(ban({ uid: user.id, name: user.name }))
        }}
      >
        <p style={{ margin: "0px" }}>{t("ban_user")}</p>
      </button>
    ) : null

  const unbanButton =
    user && role && (role === Role.ADMIN || role === Role.MODERATOR) ? (
      <button
        className="bubbly red"
        onClick={() => {
          dispatch(unban({ uid: user.id, name: user.name }))
        }}
      >
        <p style={{ margin: "0px" }}>{t("unban_user")}</p>
      </button>
    ) : null

  const modButton =
    user && role && role === Role.ADMIN ? (
      <button
        className="bubbly orange"
        onClick={() => {
          dispatch(setModerator(user.id))
        }}
      >
        <p style={{ margin: "0px" }}>{t("set_moderator")}</p>
      </button>
    ) : null

  const botManagerButton =
    user && role && role === Role.ADMIN ? (
      <button
        className="bubbly orange"
        onClick={() => {
          dispatch(setBotManager(user.id))
        }}
      >
        <p style={{ margin: "0px" }}>{t("set_bot_manager")}</p>
      </button>
    ) : null

  const titleButton =
    user && role && role === Role.ADMIN ? (
      <div style={{ display: "flex" }}>
        <select
          value={title}
          onChange={(e) => {
            setTitle(e.target.value as Title)
          }}
        >
          {Object.keys(Title).map((ti) => (
            <option key={ti} value={ti}>
              {ti}
            </option>
          ))}
        </select>
        <button
          className="bubbly blue"
          onClick={() => {
            dispatch(giveTitle({ uid: user.id, title: title }))
          }}
        >
          {t("give_title")}
        </button>
      </div>
    ) : null

  return (
    <div>
      <div className="nes-field is-inline">
        <input
          type="text"
          className="my-input"
          placeholder="Player Name..."
          value={currentText}
          onChange={(e) => {
            setCurrentText(e.target.value)
            dispatch(searchName(e.target.value))
          }}
        />
      </div>

      <ul className="search-suggestions">
        {suggestions.map((suggestion) => (
          <li
            className="player-box clickable"
            key={suggestion.id}
            onClick={(e) => {
              dispatch(searchById(suggestion.id))
            }}
          >
            <img
              src={getAvatarSrc(suggestion.avatar)}
              className="pokemon-portrait"
            />
            <p>{suggestion.name}</p>
          </li>
        ))}
      </ul>

      {user && (
        <div className="player-history nes-container">
          <PlayerBox user={user} />
          {(role === Role.ADMIN || role === Role.MODERATOR) && (
            <div className="actions">
              {modButton}
              {botManagerButton}
              {giveButton}
              {titleButton}
              {banButton}
              {unbanButton}
            </div>
          )}
          <History history={user.history} />
        </div>
      )}
    </div>
  )
}
