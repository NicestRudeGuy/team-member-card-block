const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText, MediaUpload } = wp.editor;
const { Button } = wp.components;

registerBlockType('team-member-card/team_member_card_block_gutenberg', {
  title: __( 'Team Member Card', 'team_member_card_block' ),
  icon: 'admin-users',
  category: 'common',
  keywords: [ __('team'), __('member'), __('card')],
  attributes: {
    title: {
      type: 'string',
      source: 'text',
      selector: '.card-title',
    },
    body: {
      type: 'string',
      source: 'children',
      selector: '.card-body',
    },
    imageId: {
      type: 'number',
    },
    imageAlt: {
      type: 'string',
      attribute: 'alt',
      selector: '.card-image',
    },
    imageUrl: {
      type: 'string',
      attribute: 'src',
      selector: '.card-image',
    }
  },
  edit: ({ className, attributes, setAttributes }) => {
    const { imageUrl, imageId, imageAlt, body, title } = attributes;
    const onSelectImage = ( media ) => {
      setAttributes({
        imageUrl: media.url,
        imageId: media.id,
        imageAlt: media.alt,
      });
    }
    const onChangeTitle = ( value ) => {
      setAttributes({ title: value });
    }
    const onChangeBody = ( value ) => {
      setAttributes({ body: value });
    }
    return(
      <div className={ className }>
        <MediaUpload
          onSelect={ onSelectImage }
          allowedTypes="image"
          value={ imageId }
          render={( { open } ) => (
            <Button
              className={ imageID ? 'image-button' : 'button button-large' }
              onClick={ open }
            >
              { !imageId ? (
                __( 'Media Library', 'team_member_card_block' )
              ) : (
                <img
                  src={ imageUrl }
                  alt={ imageAlt }
                />
              ) }
            </Button>
          )}
        />
        <RichText
          tagName="h3"
          multiline={ false }
          placeholder={ __( "Team Member's Name", 'team_member_card_block' ) }
          value={ title }
          onChange={ onChangeTitle }
          className="card-title"
        />
        <RichText
          tagName="div"
          multiline="p"
          className="card-body"
          placeholder={ __( "Team Member's Bio", 'team_member_card_block' ) }
          value={ body }
          onChange={ onChangeBody }
        />
      </div>
    )
  },
  save: ({ className, attributes }) => {
    const { title, body, imageUrl, imageAlt } = attributes;
    return (
      <div className={ className }>
        { mediaUrl && (
          <img
            className="card-image"
            src={ imageUrl }
            alt={ imageAlt }
          />
        ) }

        <RichText.Content tagName="h3" className="card-title" value={ title } />

        <RichText.Content tangName="p" className="card-body" value={ body } />

      </div>
    )
  }
})