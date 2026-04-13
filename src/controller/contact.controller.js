import ContactDetail from '../model/social.modal.js';

// Create a new contact
export const createContact = async (req, res) => {
  try {
    const { telegram, email } = req.body;

    if (!telegram && !email) {
      return res.status(400).json({ 
        success: false, 
        message: 'At least one contact method (telegram or email) is required' 
      });
    }

    const contactDetail = new ContactDetail({
      telegram,
      email
    });

    const savedContact = await contactDetail.save();

    res.status(201).json({
      success: true,
      message: 'Contact created successfully',
      data: savedContact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating contact',
      error: error.message
    });
  }
};

// Update a contact by ID
export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { telegram, email } = req.body;

    if (!telegram && !email) {
      return res.status(400).json({ 
        success: false, 
        message: 'At least one contact method (telegram or email) is required' 
      });
    }

    const updatedContact = await ContactDetail.findByIdAndUpdate(
      id,
      {
        telegram,
        email,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact updated successfully',
      data: updatedContact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating contact',
      error: error.message
    });
  }
};
